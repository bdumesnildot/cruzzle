CREATE DATABASE IF NOT EXISTS `mesnil_cruzzle`;

CREATE TABLE `role` (
  `id` integer PRIMARY KEY,
  `name` varchar(255) NOT NULL
);
INSERT INTO `role` (`id`, `name`)
VALUES
  ('0', 'user'),
  ('55', 'admin'),
  ('88', 'superAdmin');



CREATE TABLE `agency` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL
);
INSERT INTO `agency` (`name`, `city`, `country`)
VALUES
  ('Wildforge', 'Bordeaux', 'France'),
  ('SalesIt', 'Paris', 'France'),
  ('Manafo', 'Madrid', 'Espagne'),
  ('Eurosys', 'Rome', 'Italie'),
  ('TechVista', 'Londres', 'Royaume-Uni'),
  ('GloboTech', 'Berlin', 'Allemagne'),
  ('EuroTech', 'Amsterdam', 'Pays-Bas'),
  ('PowerTech', 'Athènes', 'Grèce'),
  ('PrimeTech', 'Lisbonne', 'Portugal'),
  ('InnovaCorp', 'Dublin', 'Irlande'),
  ('SkySoft', 'Stockholm', 'Suède'),
  ('EuroWeb', 'Copenhague', 'Danemark'),
  ('NordicTech', 'Oslo', 'Norvège'),
  ('MaxTech', 'Varsovie', 'Pologne'),
  ('AlphaTech', 'Budapest', 'Hongrie');



CREATE TABLE `position` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL
);
INSERT INTO `position` (`name`)
VALUES
  ('Director'),
  ('Department Manager'),
  ('Sales Manager'),
  ('Accountant'),
  ('Human Resources Manager'),
  ('Marketing Manager'),
  ('IT Manager'),
  ('Project Manager'),
  ('Financial Analyst'),
  ('Administrative Assistant'),
  ('Operations Manager'),
  ('Customer Service Manager'),
  ('Product Manager'),
  ('Purchasing Manager'),
  ('Research and Development Manager'),
  ('Quality Assurance Manager'),
  ('Supply Chain Manager'),
  ('Business Development Manager'),
  ('Training and Development Manager'),
  ('Legal Counsel'),
  ('Public Relations Manager'),
  ('Operations Supervisor'),
  ('Inventory Manager'),
  ('Logistics Manager'),
  ('Technical Support Specialist'),
  ('Data Analyst'),
  ('Sales Representative'),
  ('Customer Support Representative'),
  ('Marketing Coordinator'),
  ('Systems Administrator'),
  ('Web Developer'),
  ('Graphic Designer');



CREATE TABLE `category` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `label` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL
);
INSERT INTO `category` (`label`, `color`)
VALUES
  ('Technology', 'rgba(0, 123, 255, 0.87)'),
  ('Art and Design', 'rgba(255, 45, 85, 0.87)'),
  ('Science', 'rgba(100, 210, 30, 0.87)'),
  ('Health and Wellness', 'rgba(175, 82, 222, 0.87)'),
  ('Education', 'rgba(255, 149, 0, 0.87)'),
  ('Environment', 'rgba(0, 200, 83, 0.87)'),
  ('Business and Finance', 'rgba(52, 199, 89, 0.87)'),
  ('Entertainment', 'rgba(255, 59, 48, 0.87)'),
  ('Social Impact', 'rgba(90, 200, 250, 0.87)'),
  ('Sports and Recreation', 'rgba(88, 86, 214, 0.87)');



CREATE TABLE `user` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `mail` varchar(255) NOT NULL UNIQUE,
  `hashed_password` varchar(255) NOT NULL,
  `role_id` integer NOT NULL,
  `avatar_url` varchar(255) DEFAULT null,
  `banner_url` varchar(255) DEFAULT null,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `link` varchar(255) DEFAULT null,
  `birthdate` datetime DEFAULT null,
  `share_birthdate` boolean DEFAULT false,
  `phone` varchar(255) DEFAULT null,
  `share_phone` boolean DEFAULT false,
  `biography` varchar(255) DEFAULT null,
  `agency_id` integer not null,
  `joined_at` datetime not null,
  `position_id` integer not null,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `is_active` boolean DEFAULT false,
  FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  FOREIGN KEY (`agency_id`) REFERENCES `agency` (`id`),
  FOREIGN KEY (`position_id`) REFERENCES `position` (`id`)
);
INSERT INTO `user` (`mail`, `hashed_password`, `role_id`, `avatar_url`, `banner_url`, `firstname`, `lastname`, `birthdate`, `share_birthdate`, `phone`, `share_phone`, `biography`, `agency_id`, `joined_at`, `position_id`, `is_active`)
VALUES
  ('super.admin@example.com', '$2b$11$E9jZ98axstDe.urm9vmJ0usT.PCufmwnQWmHSyJQ.gUKg6d2BL.rO', 88, 'https://picsum.photos/200', 'https://picsum.photos/1000/300', 'Sarah', 'Conor', '1972-11-12 12:33:11', false, '+33655758466', false, 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.', 1, '2017-06-13 12:33:11', 1, true),
  ('admin@example.com', '$2b$11$E9jZ98axstDe.urm9vmJ0usT.PCufmwnQWmHSyJQ.gUKg6d2BL.rO', 55, 'https://picsum.photos/200', 'https://picsum.photos/1000/300', 'Nelson', 'Monfort', '1955-04-22 12:33:11', true, '+33659862414', true, 'This is a vrai plaisir to colaborate with vous.', 2, '2017-06-13 12:33:11', 1, true),
  ('john.doe@gmail.com', '$2b$11$E9jZ98axstDe.urm9vmJ0usT.PCufmwnQWmHSyJQ.gUKg6d2BL.rO', 0, 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80', 'https://i.postimg.cc/XNgRKp70/Idea-banner.jpg', 'John', 'Doe', '1988-01-23 12:33:11', true, '+33659862414', true, 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', 3, '2017-06-13 12:33:11', 1, true),
  ('user2@example.com', '$2b$11$E9jZ98axstDe.urm9vmJ0usT.PCufmwnQWmHSyJQ.gUKg6d2BL.rO', 0, 'https://picsum.photos/200', 'https://picsum.photos/1000/300', 'Florent', 'Panini', '1981-03-05 12:33:11', true, '+33659862414', true, 'Lorem ipsum dolor sit amet.', 2, '2017-06-13 12:33:11', 1, false),
  ('user3@example.com', '$2b$11$E9jZ98axstDe.urm9vmJ0usT.PCufmwnQWmHSyJQ.gUKg6d2BL.rO', 0, 'https://picsum.photos/200', 'https://picsum.photos/1000/300', 'Emily', 'Anderson', '1995-09-08 12:33:11', true, '+33659862414', true, 'Lorem ipsum dolor sit amet.', 4, '2017-06-13 12:33:11', 2, true),
  ('user4@example.com', '$2b$11$E9jZ98axstDe.urm9vmJ0usT.PCufmwnQWmHSyJQ.gUKg6d2BL.rO', 0, 'https://picsum.photos/200', 'https://picsum.photos/1000/300', 'Michael', 'Lee', '1984-07-17 12:33:11', true, '+33659862414', true, 'Lorem ipsum dolor sit amet.', 6, '2017-06-13 12:33:11', 3, true),
  ('user5@example.com', '$2b$11$E9jZ98axstDe.urm9vmJ0usT.PCufmwnQWmHSyJQ.gUKg6d2BL.rO', 0, 'https://picsum.photos/200', 'https://picsum.photos/1000/300', 'Sophia', 'Gonzalez', '1992-12-29 12:33:11', true, '+33659862414', true, 'Lorem ipsum dolor sit amet.', 10, '2017-06-13 12:33:11', 4, true),
  ('user6@example.com', '$2b$11$E9jZ98axstDe.urm9vmJ0usT.PCufmwnQWmHSyJQ.gUKg6d2BL.rO', 0, 'https://picsum.photos/200', 'https://picsum.photos/1000/300', 'Ethan', 'Martin', '1998-02-14 12:33:11', true, '+33659862414', true, 'Lorem ipsum dolor sit amet.', 12, '2017-06-13 12:33:11', 5, true),
  ('user8@example.com', '$2b$11$E9jZ98axstDe.urm9vmJ0usT.PCufmwnQWmHSyJQ.gUKg6d2BL.rO', 0, 'https://picsum.photos/200', 'https://picsum.photos/1000/300', 'Olivia', 'Smith', '1990-06-03 12:33:11', true, '+33659862414', true, 'Lorem ipsum dolor sit amet.', 8, '2017-06-13 12:33:11', 6, true),
  ('user9@example.com', '$2b$11$E9jZ98axstDe.urm9vmJ0usT.PCufmwnQWmHSyJQ.gUKg6d2BL.rO', 0, 'https://picsum.photos/200', 'https://picsum.photos/1000/300', 'Liam', 'Johnson', '1987-09-17 12:33:11', true, '+33659862414', true, 'Lorem ipsum dolor sit amet.', 14, '2017-06-13 12:33:11', 7, true),
  ('user10@example.com', '$2b$11$E9jZ98axstDe.urm9vmJ0usT.PCufmwnQWmHSyJQ.gUKg6d2BL.rO', 0, 'https://picsum.photos/200', 'https://picsum.photos/1000/300', 'Emma', 'Brown', '1993-11-21 12:33:11', true, '+33659862414', true, 'Lorem ipsum dolor sit amet.', 15, '2017-06-13 12:33:11', 8, true),
  ('user11@example.com', '$2b$11$E9jZ98axstDe.urm9vmJ0usT.PCufmwnQWmHSyJQ.gUKg6d2BL.rO', 0, 'https://picsum.photos/200', 'https://picsum.photos/1000/300', 'Noah', 'Taylor', '1996-04-27 12:33:11', true, '+33659862414', true, 'Lorem ipsum dolor sit amet.', 3, '2017-06-13 12:33:11', 9, true),
  ('cruzzle@mail.com', '$2b$11$E9jZ98axstDe.urm9vmJ0usT.PCufmwnQWmHSyJQ.gUKg6d2BL.rO', 0, 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80', 'https://i.postimg.cc/XNgRKp70/Idea-banner.jpg', 'Matthias', 'Cruzzle', '1988-01-23 12:33:11', true, '+33659862414', true, 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', 3, '2017-06-13 12:33:11', 1, true);



CREATE TABLE `idea` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `context` text NOT NULL,
  `user_id` integer NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `archived_at` datetime DEFAULT null,
  `deleted_at` datetime DEFAULT null,
  `goal` text DEFAULT null,
  `profits` text DEFAULT null,
  `risks` text DEFAULT null,
  `cloudshare` varchar(255) DEFAULT null,
  `primary_img` varchar(255) DEFAULT null,
  `views` integer NOT NULL DEFAULT 0,
  FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
);
INSERT INTO `idea` (`title`, `context`, `user_id`, `created_at`, `archived_at`, `deleted_at`, `goal`, `profits`, `risks`, `cloudshare`, `primary_img`, `views`)
VALUES
  ('Idea 1', 'Lorem ipsum dolor sit amet. Consectetur adipiscing elit.', 1, '2023-06-28 00:00:01', NULL, NULL, 'Achieve a sustainable future.', 'Increase revenue and market share.', 'Mitigate potential risks.', NULL, 'https://picsum.photos/500/500', 200),
  ('Idea 2', 'Consectetur adipiscing elit. Lorem ipsum dolor sit amet. ', 2, '2023-07-03 12:37:16', NULL, NULL, 'Improve user experience.', 'Expand into new markets.', 'Manage competitive challenges.', NULL, 'https://picsum.photos/500/500', 50),
  ('Idea 3', 'Consectetur adipiscing elit. Lorem ipsum dolor sit amet. ', 2, '2023-06-23 12:33:11', NULL, NULL, 'Improve user experience.', 'Expand into new markets.', 'Manage competitive challenges.', NULL, 'https://picsum.photos/500/500', 50),
  ('Idea 4', 'Lorem ipsum dolor sit amet. Consectetur adipiscing elit.', 3, '2023-06-15 12:33:11', NULL, NULL, 'Increase operational efficiency.', 'Optimize cost and resource utilization.', 'Address scalability challenges.', NULL, 'https://picsum.photos/500/500', 100),
  ('Idea 5', 'Consectetur adipiscing elit. Lorem ipsum dolor sit amet.', 4, '2023-06-20 12:33:11', NULL, '2023-06-23', 'Enhance product quality.', 'Differentiate from competitors.', 'Maintain customer satisfaction.', NULL, 'https://picsum.photos/500/500', 75),
  ('Idea 6', 'Lorem ipsum dolor sit amet. Consectetur adipiscing elit.', 5, '2023-06-14 12:33:11', NULL, NULL, 'Streamline internal processes.', 'Improve time-to-market.', 'Ensure data security and privacy.', NULL, 'https://picsum.photos/500/500', 150),
  ('Idea 7', 'Consectetur adipiscing elit. Lorem ipsum dolor sit amet.', 6, '2023-06-22 12:33:11', NULL, NULL, 'Expand customer base.', 'Drive customer loyalty and retention.', 'Adapt to changing market trends.', NULL, 'https://picsum.photos/500/500', 80),
  ('Idea 8', 'Lorem ipsum dolor sit amet. Consectetur adipiscing elit.', 7, '2023-06-24 12:33:11', NULL, NULL, 'Optimize supply chain management.', 'Reduce costs and improve delivery times.', 'Manage supplier relationships.', NULL, 'https://picsum.photos/500/500', 120);

CREATE TABLE `idea_like` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer NOT NULL,
  `idea_id` integer,
  `liked_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  FOREIGN KEY (`idea_id`) REFERENCES `idea` (`id`)
);
INSERT INTO `idea_like` (`user_id`, `idea_id`)
VALUES
  (1, 2),
  (2, 3),
  (3, 4),
  (4, 5),
  (5, 6),
  (6, 7),
  (7, 8),
  (12, 1),
  (1, 3),
  (2, 4),
  (3, 5),
  (4, 6),
  (5, 7),
  (6, 8),
  (7, 8),
  (8, 8),
  (9, 8),
  (10, 5),
  (11, 1),
  (12, 2),
  (1, 4),
  (2, 5),
  (3, 6),
  (4, 7),
  (5, 8),
  (6, 8),
  (7, 6),
  (8, 2),
  (9, 3),
  (10, 1),
  (11, 2),
  (12, 3);



CREATE TABLE `favorit` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer NOT NULL,
  `idea_id` integer NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  FOREIGN KEY (`idea_id`) REFERENCES `idea` (`id`)
);
INSERT INTO `favorit` (`user_id`, `idea_id`)
VALUES
  (1, 2),
  (2, 3),
  (3, 4),
  (4, 5),
  (5, 6),
  (6, 7),
  (7, 8),
  (1, 4),
  (2, 5),
  (3, 6),
  (4, 7),
  (5, 8),
  (6, 8);



CREATE TABLE `attachment` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `idea_id` integer NOT NULL,
  `content_url` varchar(255) NOT NULL,
  FOREIGN KEY (`idea_id`) REFERENCES `idea` (`id`)
);



CREATE TABLE `comment` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `idea_id` integer NOT NULL,
  `user_id` integer NOT NULL,
  `body` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`idea_id`) REFERENCES `idea` (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
);
INSERT INTO `comment` (`idea_id`, `user_id`, `body`, `created_at`)
VALUES
  (1, 2, 'I have some suggestions to improve this idea.', '2023-05-27 10:05:45'),
  (3, 3, 'This idea has great potential!', '2023-05-28 16:55:11'),
  (5, 4, 'I''m not sure if this idea will work in practice.', '2023-05-29 08:47:29'),
  (4, 5, 'I think this concept needs more development.', '2023-05-30 13:22:05'),
  (7, 6, 'I love the creativity behind this idea.', '2023-05-31 19:18:47'),
  (6, 7, 'Great job on explaining the benefits!', '2023-06-01 15:10:36'),
  (8, 8, 'I''m excited to see how this idea evolves.', '2023-06-02 11:40:59'),
  (3, 9, 'I have some concerns regarding the implementation.', '2023-06-03 14:56:22'),
  (4, 10, 'Have you considered the potential risks involved?', '2023-06-04 09:37:15'),
  (6, 11, 'This idea aligns well with our company goals.', '2023-06-05 17:25:03'),
  (4, 3, 'This idea has the potential to disrupt the market.', '2023-06-17 14:37:41'),
  (1, 2, 'This is a great idea!', '2023-07-01 10:00:00'),
  (1, 3, 'I have some suggestions to improve it.', '2023-07-02 12:30:00'),
  (1, 4, 'Im excited to see this idea come to life.', '2023-07-03 15:15:00'),
  (1, 5, 'Have you considered the potential challenges?', '2023-07-04 09:45:00'),
  (1, 6, 'I think this idea has a lot of potential.', '2023-07-05 14:00:00'),
  (1, 7, 'This idea aligns well with our company goals.', '2023-07-06 17:45:00'),
  (1, 8, 'I have some concerns regarding the implementation.', '2023-07-07 11:30:00'),
  (1, 9, 'This idea needs further development.', '2023-07-08 13:00:00'),
  (1, 10, 'Im impressed with the level of innovation.', '2023-07-09 16:20:00'),
  (1, 2, 'What are the expected profits from this idea?', '2023-07-10 10:45:00'),
  (1, 3, 'I believe this idea will have a positive impact.', '2023-07-11 12:15:00'),
  (1, 4, 'Im excited to contribute to this idea.', '2023-07-11 15:30:00'),
  (1, 5, 'This idea has the potential to disrupt the market.', '2023-07-11 09:00:00'),
  (1, 6, 'I have some suggestions for the implementation.', '2023-07-11 14:45:00'),
  (1, 7, 'Great job on explaining the benefits!', '2023-07-11 17:15:00'),
  (1, 8, 'Im interested in collaborating on this idea.', '2023-07-11 11:00:00'),
  (1, 9, 'This idea aligns with our company values.', '2023-07-11 13:30:00'),
  (1, 10, 'I have some concerns about the market demand.', '2023-07-11 16:50:00'),
  (1, 2, 'Lets discuss the potential risks involved.', '2023-07-11 10:15:00'),
  (1, 3, 'Im excited to be part of this idea!', '2023-07-11 12:45:00');



CREATE TABLE `comment_like` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `comment_id` integer NOT NULL,
  `user_id` integer NOT NULL,
  FOREIGN KEY (`comment_id`) REFERENCES `comment` (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
);
INSERT INTO `comment_like` (`comment_id`, `user_id`)
VALUES
  (1, 1),
  (1, 2),
  (2, 3),
  (2, 4);



CREATE TABLE `idea_teams` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `idea_id` integer NOT NULL,
  `user_id` integer NOT NULL,
  FOREIGN KEY (`idea_id`) REFERENCES `idea` (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
);
INSERT INTO `idea_teams` (`idea_id`, `user_id`)
VALUES
  (1, 2),
  (1, 3),
  (1, 4),
  (2, 3),
  (2, 4),
  (2, 5),
  (2, 6),
  (3, 4),
  (3, 3),
  (3, 6),
  (4, 4),
  (4, 5),
  (4, 6),
  (4, 7),
  (4, 8),
  (4, 9),
  (5, 9),
  (6, 1),
  (6, 3),
  (6, 9);



CREATE TABLE `idea_category` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `idea_id` integer NOT NULL,
  `category_id` integer NOT NULL,
  FOREIGN KEY (`idea_id`) REFERENCES `idea` (`id`),
  FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
);
INSERT INTO `idea_category` (`idea_id`, `category_id`)
VALUES
  (3, 5),
  (3, 6),
  (4, 7),
  (4, 8),
  (5, 9),
  (5, 10),
  (6, 1),
  (6, 2),
  (7, 3),
  (7, 4),
  (8, 5),
  (8, 6),
  (1, 9),
  (1, 10),
  (2, 1),
  (2, 2);



CREATE TABLE `notification_idea` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `idea_id` integer NOT NULL,
  `user_id` integer NOT NULL,
  `type` varchar(255) NOT null,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `red_at` datetime DEFAULT null,
  FOREIGN KEY (`idea_id`) REFERENCES `idea` (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
);