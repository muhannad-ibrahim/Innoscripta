<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'source',
        'category',
        'published_at',
    ];

    // Scope for keyword search in title or content
    public function scopeKeyword($query, $keyword)
    {
        if ($keyword) {
            $query->where(function ($q) use ($keyword) {
                $q->where('title', 'like', "%$keyword%")
                  ->orWhere('content', 'like', "%$keyword%") ;
            });
        }
        return $query;
    }

    // Scope for filtering by source
    public function scopeSource($query, $source)
    {
        if ($source) {
            $query->where('source', $source);
        }
        return $query;
    }

    // Scope for filtering by category
    public function scopeCategory($query, $category)
    {
        if ($category) {
            $query->where('category', $category);
        }
        return $query;
    }

    // Scope for filtering by date (published_at)
    public function scopeDate($query, $date)
    {
        if ($date) {
            $query->whereDate('published_at', $date);
        }
        return $query;
    }
}
