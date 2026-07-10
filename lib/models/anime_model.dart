class AnimeModel {
  final String id;
  final String title;
  final String description;
  final String imageUrl;
  final double rating;
  final int totalEpisodes;
  final List<String> genres;
  final String status;
  final String releaseDate;

  AnimeModel({
    required this.id,
    required this.title,
    required this.description,
    required this.imageUrl,
    required this.rating,
    required this.totalEpisodes,
    required this.genres,
    required this.status,
    required this.releaseDate,
  });

  factory AnimeModel.fromJson(Map<String, dynamic> json) {
    return AnimeModel(
      id: json['id'] ?? '',
      title: json['title'] ?? '',
      description: json['description'] ?? '',
      imageUrl: json['imageUrl'] ?? '',
      rating: (json['rating'] ?? 0.0).toDouble(),
      totalEpisodes: json['totalEpisodes'] ?? 0,
      genres: List<String>.from(json['genres'] ?? []),
      status: json['status'] ?? '',
      releaseDate: json['releaseDate'] ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'description': description,
      'imageUrl': imageUrl,
      'rating': rating,
      'totalEpisodes': totalEpisodes,
      'genres': genres,
      'status': status,
      'releaseDate': releaseDate,
    };
  }
}
