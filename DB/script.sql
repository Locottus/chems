/*
docker exec -it 05b3a3471f6f bash
root@05b3a3471f6f:/# psql -U postgres
postgres-# CREATE DATABASE mytest;
postgres-# \q
*/
create database chemita;

-- Table: public.usuarios

-- DROP TABLE IF EXISTS public.usuarios;

CREATE TABLE IF NOT EXISTS public.usuarios
(
    usuario text COLLATE pg_catalog."default" NOT NULL,
    clave text COLLATE pg_catalog."default" NOT NULL,
    activo numeric default 1,
    rol numeric default 0,
    nombre text,
    CONSTRAINT usuarios_pkey PRIMARY KEY (usuario)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.usuarios
    OWNER to postgres;



-- Table: public.Pedido

-- DROP TABLE IF EXISTS public."pedido";

CREATE TABLE IF NOT EXISTS public."pedido"
(
	id SERIAL PRIMARY KEY,
	title text COLLATE pg_catalog."default" NOT NULL,
    date timestamp without time zone NOT NULL,
    detalle text COLLATE pg_catalog."default" NOT NULL,
    nombre text COLLATE pg_catalog."default" NOT NULL,
    telefono text COLLATE pg_catalog."default" NOT NULL,
    ubicacion text COLLATE pg_catalog."default",
    nota text COLLATE pg_catalog."default",
    hora text COLLATE pg_catalog."default",
    detallejson text COLLATE pg_catalog."default",
    recordatorio timestamp without time zone  NULL,
    total numeric
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."pedido"
    OWNER to postgres;
	


CREATE TABLE IF NOT EXISTS public."detalle"
(
    pedido numeric NOT NULL,
    articulo numeric NOT NULL,
    cantidad numeric NULL,
    precio numeric NULL,
    CONSTRAINT detall_pkey PRIMARY KEY (pedido,articulo)
)


-- Table: public.catalogo

-- DROP TABLE IF EXISTS public.catalogo;

CREATE TABLE IF NOT EXISTS public.catalogo
(
    id numeric NOT NULL,
	nombre text COLLATE pg_catalog."default" NOT NULL,
    empresa text COLLATE pg_catalog."default" NOT NULL,
    presentacion text COLLATE pg_catalog."default" NOT NULL,
	cantidad numeric null,
	precio numeric null,
    CONSTRAINT catalogo_pkey PRIMARY KEY (id)
)


TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.catalogo
    OWNER to postgres;	



-- Table: public.detalle-pedido

-- DROP TABLE IF EXISTS public."detalle-pedido";

CREATE TABLE IF NOT EXISTS public."detalle-pedido"
(
    id numeric NOT NULL,
    detalle text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "detalle-pedido_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."detalle-pedido"
    OWNER to postgres;

alter table public.pedido add column estado text null;



CREATE TABLE IF NOT EXISTS public."clientes"
(
    id numeric NOT NULL,
	nombre text COLLATE pg_catalog."default" NOT NULL,
    telefono text COLLATE pg_catalog."default" NOT NULL,
    ubicacion text COLLATE pg_catalog."default" NOT NULL,
    email text COLLATE pg_catalog."default"  NULL,    
    CONSTRAINT clientes_pkey PRIMARY KEY (id)
)





