<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use App\Models\Article;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class FetchArticlesCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'articles:fetch';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetch and store news articles from external APIs';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $sources = [
            'NewsAPI',
            'Guardian',
            'NYT',
        ];
        foreach ($sources as $source) {
            try {
                $articles = $this->fetchFromSource($source);
                foreach ($articles as $article) {
                    // Deduplication: check by title+source+published_at
                    $exists = Article::where('title', $article['title'])
                        ->where('source', $article['source'])
                        ->whereDate('published_at', Carbon::parse($article['published_at'])->toDateString())
                        ->exists();
                    if (!$exists) {
                        Article::create($article);
                    }
                }
                $this->info("Fetched and stored articles from $source");
            } catch (\Exception $e) {
                Log::error("Failed to fetch from $source: " . $e->getMessage());
                $this->error("Failed to fetch from $source: " . $e->getMessage());
            }
        }
    }

    private function fetchFromSource($source)
    {
        switch ($source) {
            case 'NewsAPI':
                return $this->fetchFromNewsAPI();
            case 'Guardian':
                return $this->fetchFromGuardian();
            case 'NYT':
                return $this->fetchFromNYT();
            default:
                return [];
        }
    }

    private function fetchFromNewsAPI()
    {
        $apiKey = env('NEWSAPI_KEY');
        $url = 'https://newsapi.org/v2/top-headlines?country=us&language=en&pageSize=10&apiKey=' . $apiKey;
        $response = Http::get($url);
        if (!$response->ok()) {
            throw new \Exception('NewsAPI fetch failed: ' . $response->body());
        }
        $data = $response->json();
        $articles = [];
        foreach ($data['articles'] as $item) {
            $articles[] = [
                'title' => $item['title'] ?? '',
                'content' => $this->cleanContent($item['content'] ?? ($item['description'] ?? '')),
                'source' => $item['source']['name'] ?? 'NewsAPI',
                'category' => 'General',
                'published_at' => isset($item['publishedAt']) ? Carbon::parse($item['publishedAt'])->format('Y-m-d H:i:s') : now(),            ];
        }
        return $articles;
    }

    private function cleanContent($content, $maxLength = 1000)
    {
        // Remove HTML tags
        $cleanContent = strip_tags($content);
        // Limit length
        if (strlen($cleanContent) > $maxLength) {
            $cleanContent = substr($cleanContent, 0, $maxLength) . '...';
        }
        return $cleanContent;
    }

    private function fetchFromGuardian()
    {
        $apiKey = env('GUARDIAN_KEY');
        $url = 'https://content.guardianapis.com/search';
        $response = Http::get($url, [
            'api-key' => $apiKey,
            'show-fields' => 'headline,body',
            'page-size' => 10,
        ]);
        if (!$response->ok()) {
            throw new \Exception('Guardian fetch failed: ' . $response->body());
        }
        $data = $response->json();
        $articles = [];
        foreach ($data['response']['results'] as $item) {
            $articles[] = [
                'title' => $item['webTitle'] ?? '',
                'content' => $this->cleanContent($item['fields']['body'] ?? ''),
                'source' => 'The Guardian',
                'category' => $item['sectionName'] ?? 'General',
                'published_at' => isset($item['webPublicationDate']) ? Carbon::parse($item['webPublicationDate'])->format('Y-m-d H:i:s') : now(),
            ];
        }
        return $articles;
    }

    private function fetchFromNYT()
    {
        $apiKey = env('NYT_KEY');
        $url = 'https://api.nytimes.com/svc/topstories/v2/home.json';
        $response = Http::get($url, [
            'api-key' => $apiKey,
        ]);
        if (!$response->ok()) {
            throw new \Exception('NYT fetch failed: ' . $response->body());
        }
        $data = $response->json();
        $articles = [];
        foreach ($data['results'] as $item) {
            $articles[] = [
                'title' => $item['title'] ?? '',
                'content' => $this->cleanContent($item['abstract'] ?? ''),
                'source' => 'NYT',
                'category' => $item['section'] ?? 'General',
                'published_at' => isset($item['publishedAt']) ? Carbon::parse($item['publishedAt'])->format('Y-m-d H:i:s') : now(),            ];
        }
        return $articles;
    }
}
