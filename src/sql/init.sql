CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; -- make uuid_generate_v4() possible

-- create houses table
create
	table
		public.houses( house_uuid uuid not null default uuid_generate_v4(),
		item_ref text not null,
		created timestamp DEFAULT now(),
		last_checked timestamp DEFAULT now(),
		price money null,
		topology text null,
		link text null,
		city text null,
		title text null,
		area text null,
		image text null,
		origin text not null,
		consumed bool null,
		constraint houses_primary_key primary key ( origin,
		item_ref ) );