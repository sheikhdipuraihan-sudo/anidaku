import 'package:flutter/material.dart';

class EpisodeCard extends StatelessWidget {
  final int episodeNumber;
  final String title;
  final String duration;
  final bool watched;
  final VoidCallback onTap;

  const EpisodeCard({
    Key? key,
    required this.episodeNumber,
    required this.title,
    required this.duration,
    this.watched = false,
    required this.onTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(12),
        color: const Color(0xFF1a1f3a),
        border: watched
            ? Border.all(color: const Color(0xFF6366F1), width: 1.5)
            : null,
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(12),
        child: Material(
          color: Colors.transparent,
          child: InkWell(
            onTap: onTap,
            child: Padding(
              padding: const EdgeInsets.all(12),
              child: Row(
                children: [
                  // Episode Number
                  Container(
                    width: 50,
                    height: 50,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: const Color(0xFF6366F1).withOpacity(0.2),
                    ),
                    child: Center(
                      child: Text(
                        'EP$episodeNumber',
                        style: Theme.of(context).textTheme.labelSmall?.copyWith(
                              color: const Color(0xFF6366F1),
                              fontWeight: FontWeight.bold,
                            ),
                        textAlign: TextAlign.center,
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  // Episode Info
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          title,
                          style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                                fontWeight: FontWeight.w600,
                                color: Colors.white,
                              ),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                        const SizedBox(height: 4),
                        Text(
                          duration,
                          style: Theme.of(context).textTheme.bodySmall?.copyWith(
                                color: Colors.grey,
                              ),
                        ),
                      ],
                    ),
                  ),
                  // Play Button or Watched Badge
                  if (watched)
                    Icon(
                      Icons.check_circle,
                      color: const Color(0xFF6366F1),
                      size: 24,
                    )
                  else
                    IconButton(
                      icon: const Icon(Icons.play_circle_rounded),
                      color: const Color(0xFF6366F1),
                      onPressed: onTap,
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
