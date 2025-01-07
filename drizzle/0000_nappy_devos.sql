CREATE TABLE `objects` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`name` text(100) NOT NULL,
	`createdAt` integer DEFAULT (
		strftime('%s', 'now') || substr(strftime('%f', 'now'), 4, 3)
	) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `objects_id_unique` ON `objects` (`id`);