import 'package:flutter/material.dart';

class AnimeDetailScreen extends StatelessWidget {
  final String title;
  final String imageUrl;
  final String description;
  final double rating;
  final String episodes;
  final List<String> genres;

  const AnimeDetailScreen({
    Key? key,
    required this.title,
    required this.imageUrl,
    required this.description,
    required this.rating,
    required this.episodes,
    required this.genres,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: CustomScrollView(
        slivers: [
          // App Bar with Hero Animation
          SliverAppBar(
            expandedHeight: 300,
            pinned: true,
            backgroundColor: const Color(0xFF0a0e27),
            flexibleSpace: FlexibleSpaceBar(
              background: Container(
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    colors: [
                      const Color(0xFF1a1f3a).withOpacity(0.5),
                      const Color(0xFF0a0e27),
                    ],
                  ),
                ),
                child: const Icon(
                  Icons.image,
                  size: 150,
                  color: Colors.grey,
                ),
              ),
            ),
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Title
                  Text(
                    title,
                    style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                        ),
                  ),
                  const SizedBox(height: 12),
                  // Rating and Episodes
                  Row(
                    children: [
                      ...List.generate(
                        5,
                        (i) => Icon(
                          i < rating.toInt()
                              ? Icons.star_rounded
                              : Icons.star_border_rounded,
                          size: 18,
                          color: const Color(0xFFFBBF24),
                        ),
                      ),
                      const SizedBox(width: 8),
                      Text(
                        rating.toString(),
                        style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                              color: Colors.white,
                              fontWeight: FontWeight.w600,
                            ),
                      ),
                      const SizedBox(width: 16),
                      Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 12,
                          vertical: 6,
                        ),
                        decoration: BoxDecoration(
                          color: const Color(0xFF6366F1),
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: Text(
                          episodes,
                          style: Theme.of(context).textTheme.bodySmall?.copyWith(
                                color: Colors.white,
                              ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  // Genres
                  Wrap(
                    spacing: 8,
                    children: genres
                        .map(
                          (genre) => Chip(
                            label: Text(genre),
                            backgroundColor: const Color(0xFF1a1f3a),
                            labelStyle: const TextStyle(
                              color: Colors.white70,
                              fontSize: 12,
                            ),
                          ),
                        )
                        .toList(),
                  ),
                  const SizedBox(height: 24),
                  // Description Title
                  Text(
                    'Synopsis',
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                        ),
                  ),
                  const SizedBox(height: 8),
                  // Description
                  Text(
                    description,
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                          color: Colors.grey[400],
                          height: 1.6,
                        ),
                  ),
                  const SizedBox(height: 24),
                  // Action Buttons
                  Row(
                    children: [
                      Expanded(
                        child: ElevatedButton.icon(
                          onPressed: () {},
                          icon: const Icon(Icons.play_circle_filled),
                          label: const Text('Watch Now'),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: const Color(0xFF6366F1),
                            foregroundColor: Colors.white,
                            padding: const EdgeInsets.symmetric(vertical: 12),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(12),
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: OutlinedButton.icon(
                          onPressed: () {},
                          icon: const Icon(Icons.download),
                          label: const Text('Download'),
                          style: OutlinedButton.styleFrom(
                            foregroundColor: const Color(0xFF6366F1),
                            side: const BorderSide(
                              color: Color(0xFF6366F1),
                            ),
                            padding: const EdgeInsets.symmetric(vertical: 12),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(12),
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
