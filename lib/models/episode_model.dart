class EpisodeModel {
  final String id;
  final int episodeNumber;
  final String title;
  final String description;
  final String videoUrl;
  final String duration;
  final DateTime releaseDate;

  EpisodeModel({
    required this.id,
    required this.episodeNumber,
    required this.title,
    required this.description,
    required this.videoUrl,
    required this.duration,
    required this.releaseDate,
  });

  factory EpisodeModel.fromJson(Map<String, dynamic> json) {
    return EpisodeModel(
      id: json['id'] ?? '',
      episodeNumber: json['episodeNumber'] ?? 0,
      title: json['title'] ?? '',
      description: json['description'] ?? '',
      videoUrl: json['videoUrl'] ?? '',
      duration: json['duration'] ?? '',
      releaseDate: DateTime.tryParse(json['releaseDate'] ?? '') ?? DateTime.now(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'episodeNumber': episodeNumber,
      'title': title,
      'description': description,
      'videoUrl': videoUrl,
      'duration': duration,
      'releaseDate': releaseDate.toIso8601String(),
    };
  }
}
