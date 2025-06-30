<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Article>
 */
class ArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $sources = ['Reuters', 'BBC', 'CNN', 'Al Jazeera', 'The Verge'];
        $categories = ['Technology', 'Health', 'Business', 'Sports', 'Entertainment'];
        return [
            'title' => $this->faker->sentence(),
            'content' => $this->faker->paragraphs(3, true),
            'source' => $this->faker->randomElement($sources),
            'category' => $this->faker->randomElement($categories),
            'published_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
        ];
    }
}
