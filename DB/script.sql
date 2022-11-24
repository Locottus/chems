create database chemita;

-- Table: public.usuarios

-- DROP TABLE IF EXISTS public.usuarios;

CREATE TABLE IF NOT EXISTS public.usuarios
(
    usuario text COLLATE pg_catalog."default" NOT NULL,
    clave text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT usuarios_pkey PRIMARY KEY (usuario)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.usuarios
    OWNER to postgres;



-- Table: public.Pedido

-- DROP TABLE IF EXISTS public."Pedido";

CREATE TABLE IF NOT EXISTS public."Pedido"
(
    fecha timestamp NOT NULL,
    detalle text COLLATE pg_catalog."default" NOT NULL,
    nombre text COLLATE pg_catalog."default" NOT NULL,
    telefono text COLLATE pg_catalog."default" NOT NULL,
    ubicacion text COLLATE pg_catalog."default",
    notas text COLLATE pg_catalog."default",
    hora text COLLATE pg_catalog."default",
    recordatorio numeric,
    CONSTRAINT "Pedido_pkey" PRIMARY KEY (fecha)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Pedido"
    OWNER to postgres;

