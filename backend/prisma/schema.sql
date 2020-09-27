CREATE TABLE "public"."User" (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(255) NOT NULL DEFAULT 'default.png'
);

CREATE TABLE "public"."Playlist" (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    "userId" INTEGER NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "public"."User"(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "public"."Music" (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    avatar VARCHAR(255) NOT NULL DEFAULT 'default-music.png',
    url VARCHAR(255) NOT NULL
);

CREATE TABLE "public"."PlaylistToMusic" (
    "playlistId" INTEGER NOT NULL,
    "musicId" INTEGER NOT NULL,
    FOREIGN KEY ("playlistId") REFERENCES "public"."Playlist"(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("musicId") REFERENCES "public"."Music"(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "PlaylistToMusic_index" ON "public"."PlaylistToMusic"("playlistId" int4_ops, "musicId" int4_ops);