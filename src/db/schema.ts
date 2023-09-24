import {
  pgTable,
  serial,
  varchar,
  boolean,
  date,
  text,
  timestamp,
  time,
  bigint,
  integer,
} from "drizzle-orm/pg-core";
import {
  type InferInsertModel,
  type InferSelectModel,
  relations,
} from "drizzle-orm";

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at").defaultNow(),
  active: boolean("active").default(true),

  name: text("name").unique(),
  description: text("description"),
  bucketName: text("bucket_name"),
});

export const dates = pgTable("dates", {
  id: serial("id").primaryKey(),
  date: date("date", { mode: "date" }),
  time: time("time"),
  dateStartVoting: date("date_start_voting", { mode: "date" }),
  dateEndVoting: date("date_end_voting", { mode: "date" }),
  timeStartVoting: time("time_start_voting"),
  timeEndVoting: time("time_end_voting"),

  eventId: integer("event_id")
    .notNull()
    .references(() => events.id),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }),
  description: text("description"),

  eventId: integer("event_id")
    .notNull()
    .references(() => events.id),
});

// export const participants = pgTable("participants", {
//   id: serial("id").primaryKey(),
//   name: varchar("name", { length: 255 }),
//   description: text("description"),
//   image: text("image"),
//   votes: bigint("votes", { mode: "number" }).default(0),

//   eventId: integer("event_id")
//     .notNull()
//     .references(() => events.id),
// });

// export const voters = pgTable("voters", {
//   id: serial("id").primaryKey(),
//   naam: varchar("naam", { length: 255 }),
//   email: varchar("email", { length: 255 }),
//   linkedinId: bigint("linkedin_id", { mode: "number" }),

//   eventId: integer("event_id")
//     .notNull()
//     .references(() => events.id),
// });

export const eventRelations = relations(events, ({ one, many }) => ({
  date: one(dates, {
    fields: [events.id],
    references: [dates.eventId],
  }),
  categories: many(categories),
}));

export const categoryRelations = relations(categories, ({ one, many }) => ({
  categorie: one(events, {
    fields: [categories.eventId],
    references: [events.id],
  }),
  // participants: many(participants),
}));

// export const participantRelations = relations(
//   participants,
//   ({ one, many }) => ({
//     participant: one(categories, {
//       fields: [participants.eventId],
//       references: [categories.id],
//     }),
//     voters: many(voters),
//   })
// );

// export const voterRelations = relations(voters, ({ one }) => ({
//   participant: one(participants, {
//     fields: [voters.eventId],
//     references: [participants.id],
//   }),
//   voter: one(events, { fields: [voters.eventId], references: [events.id] }),
// }));

// export const postsRelations = relations(posts, ({ one, many }) => ({
//   author: one(users, {
//     fields: [posts.authorId],
//     references: [users.id],
//   }),
//   comments: many(comments),
// }));

// export const users = pgTable("users", {
//   id: serial("id").primaryKey(),
//   name: varchar("name", { length: 255 }),
//   email: varchar("email", { length: 255 }).unique(),
// });

// export type Insert = InferInsertModel<typeof users>;
// export type Select = InferSelectModel<typeof users>;
