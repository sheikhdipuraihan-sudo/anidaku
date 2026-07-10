import 'package:flutter/material.dart';

class AnimeCard extends StatelessWidget {
  final int index;

  const AnimeCard({Key? key, required this.index}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(12),
        color: const Color(0xFF1a1f3a),
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(12),
        child: Material(
          color: Colors.transparent,
          child: InkWell(
            onTap: () {},
            child: Padding(
              padding: const EdgeInsets.all(12.0),
              child: Row(
                children: [
                  Container(
                    width: 80,
                    height: 120,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(8),
                      color: const Color(0xFF0a0e27),
                    ),
                    child: const Icon(
                      Icons.image,
                      color: Colors.grey,
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Anime Title ${index + 1}',
                          style: Theme.of(context)
                              .textTheme
                              .bodyLarge
                              ?.copyWith(
                                fontWeight: FontWeight.w600,
                                color: Colors.white,
                              ),
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                        ),
                        const SizedBox(height: 4),
                        Text(
                          'Episode 12 • Action, Adventure',
                          style: Theme.of(context)
                              .textTheme
                              .bodySmall
                              ?.copyWith(
                                color: Colors.grey,
                              ),
                        ),
                        const SizedBox(height: 8),
                        Row(
                          children: [
                            ...List.generate(
                              5,
                              (i) => Icon(
                                i < 4
                                    ? Icons.star_rounded
                                    : Icons.star_border_rounded,
                                size: 16,
                                color: const Color(0xFFFBBF24),
                              ),
                            ),
                            const SizedBox(width: 4),
                            Text(
                              '4.0',
                              style: Theme.of(context)
                                  .textTheme
                                  .bodySmall
                                  ?.copyWith(
                                    color: Colors.grey,
                                  ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                  IconButton(
                    icon: const Icon(Icons.play_circle_rounded),
                    color: const Color(0xFF6366F1),
                    onPressed: () {},
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
