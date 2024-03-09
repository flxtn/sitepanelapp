<?php

namespace App\Http\Controllers;

use App\Http\Requests\SearchRequest;
use App\Http\Requests\SiteRequest;
use App\Http\Requests\SortRequest;
use App\Services\SiteService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

class IndexController extends Controller
{

    public function __construct(protected SiteService $siteService)
    {}

    public function index(): JsonResponse
    {
        $data = $this->siteService->getData();
        return response()->json(["sites" => $data]);
    }

    public function create_item(SiteRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $this->siteService->createSite($data);
        return redirect()->route('homePage');
    }

    public function search(SearchRequest $request): View
    {
        $data = $request->validated();
        $sites = $this->siteService->searchSite($data);
        return view('homepage', ["data" => $sites]);
    }
    
    public function sort(SortRequest $request):View
    {
        $data = $request->validated();
        $sites = $this->siteService->sortSites($data);
        return view('homepage', ["data" => $sites]);
    }

    public function getSiteCreateInfo()
    {
        
    }

}
