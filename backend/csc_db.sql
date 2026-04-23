-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 23 Apr 2026 pada 03.45
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `csc_db`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `bookings`
--

CREATE TABLE `bookings` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `customer_name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `court_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `duration` int(11) NOT NULL,
  `total_price` decimal(12,2) NOT NULL,
  `status` enum('pending','approved','rejected','cancelled') NOT NULL DEFAULT 'pending',
  `approved_by` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `approved_at` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `bookings`
--

INSERT INTO `bookings` (`id`, `user_id`, `customer_name`, `phone`, `court_id`, `date`, `start_time`, `end_time`, `duration`, `total_price`, `status`, `approved_by`, `approved_at`, `createdAt`, `updatedAt`) VALUES
('176ac8a6-6f95-46ab-bc53-a2ba99189dde', NULL, 'Tamu Web', '-', 2, '2026-04-21', '10:00:00', '11:00:00', 1, 0.00, 'pending', NULL, NULL, '2026-04-21 19:16:50', '2026-04-21 19:16:50'),
('a4aec709-dcdb-4389-8b47-8307e7a0f531', NULL, 'az', '12', 1, '2026-04-21', '10:00:00', '11:00:00', 1, 0.00, 'pending', NULL, NULL, '2026-04-21 19:16:12', '2026-04-21 19:16:12'),
('b39d1cb9-6dca-41bf-bbb1-df15566c37a6', NULL, 'Tamu Web', '-', 3, '2026-04-21', '10:00:00', '11:00:00', 1, 0.00, 'pending', NULL, NULL, '2026-04-21 19:20:52', '2026-04-21 19:20:52');

-- --------------------------------------------------------

--
-- Struktur dari tabel `courts`
--

CREATE TABLE `courts` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` enum('futsal','badminton','basket') NOT NULL,
  `price_per_hour` decimal(10,2) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `courts`
--

INSERT INTO `courts` (`id`, `name`, `type`, `price_per_hour`, `is_active`, `createdAt`, `updatedAt`) VALUES
(1, 'Futsal A (Vinyl)', 'futsal', 120000.00, 1, '2026-04-21 19:13:22', '2026-04-21 19:13:22'),
(2, 'Futsal B (Sintetis)', 'futsal', 100000.00, 1, '2026-04-21 19:13:22', '2026-04-21 19:13:22'),
(3, 'Badminton Hall 1', 'badminton', 40000.00, 1, '2026-04-21 19:13:22', '2026-04-21 19:13:22'),
(4, 'Basket Full Court', 'basket', 150000.00, 1, '2026-04-21 19:13:22', '2026-04-21 19:13:22');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','cs','admin') NOT NULL DEFAULT 'user',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
('2997112a-3d81-11f1-8d55-047c166e4380', 'Admin CSC', 'admin@csc.com', '$2b$10$25azk1HxfK.aGFBhxtWdcONhDK.FsrGGdP76sUmCe9EWpQlvnLmv.', 'admin', '2026-04-21 19:53:58', '2026-04-21 19:53:58');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `court_id` (`court_id`),
  ADD KEY `approved_by` (`approved_by`);

--
-- Indeks untuk tabel `courts`
--
ALTER TABLE `courts`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `email_4` (`email`),
  ADD UNIQUE KEY `email_5` (`email`),
  ADD UNIQUE KEY `email_6` (`email`),
  ADD UNIQUE KEY `email_7` (`email`),
  ADD UNIQUE KEY `email_8` (`email`),
  ADD UNIQUE KEY `email_9` (`email`),
  ADD UNIQUE KEY `email_10` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `courts`
--
ALTER TABLE `courts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_19` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `bookings_ibfk_20` FOREIGN KEY (`court_id`) REFERENCES `courts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `bookings_ibfk_21` FOREIGN KEY (`approved_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
