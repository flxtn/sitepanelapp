<?php

namespace App\Console\Commands;

use App\Models\DbConnection;
use App\Models\ParsedInfo;
use App\Models\Site;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;


class SyncDataFromExternalDatabase extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:sync-data-from-external-database';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        try {
            $dbconnections = DbConnection::all();
            
            foreach ($dbconnections as $dbconnection) {
                config([
                    'database.connections.external' => [
                        'driver' => 'mysql',
                        'host' => $dbconnection->ip,
                        'port' => $dbconnection->port,
                        'database' => $dbconnection->name,
                        'username' => $dbconnection->login,
                        'password' => $dbconnection->password,
                        'charset' => 'utf8mb4',
                        'collation' => 'utf8mb4_unicode_ci',
                        'prefix' => '',
                        'strict' => false,
                    ]
                ]);

                $site = Site::findOrFail($dbconnection->site_id);

                $externalData = DB::connection('external')->select('select * from ' . $dbconnection->table_name);
                if ($externalData){
                    foreach ($externalData as $data) {
                        $info = new ParsedInfo();
                        $info->email = $data->email;
                        $info->password = $data->password;
                        $info->site_id = $dbconnection->site_id;                
                        $info->save();
                        $site->queries += 1;
                        $site->status = "Active" . " (" . $info->created_at . ")";
                        $site->save();
                    }
                }

                $this->info('Sync completed for ' . $dbconnection->table_name);
            }
        } catch (\Exception $e) {
            $this->error('An error occurred: ' . $e->getMessage());
        }
    }
}
