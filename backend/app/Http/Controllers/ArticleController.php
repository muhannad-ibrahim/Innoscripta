<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Article;

class ArticleController extends Controller
{
    public function index(Request $request)
    {
        $articles = Article::query()
            ->keyword($request->query('keyword'))
            ->source($request->query('source'))
            ->category($request->query('category'))
            ->date($request->query('date'))
            ->orderByDesc('published_at')
            ->paginate(10);

        return response()->json($articles);
    }
}
