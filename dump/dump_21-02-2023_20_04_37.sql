PGDMP     %                    {         
   starter_db    14.0    14.0                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16384 
   starter_db    DATABASE     ^   CREATE DATABASE starter_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';
    DROP DATABASE starter_db;
                admin    false            �            1259    16402    cats    TABLE     �   CREATE TABLE public.cats (
    id integer NOT NULL,
    url character varying NOT NULL,
    likes integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.cats;
       public         heap    admin    false            �            1259    16401    cats_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.cats_id_seq;
       public          admin    false    213                       0    0    cats_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.cats_id_seq OWNED BY public.cats.id;
          public          admin    false    212            �            1259    16391    comments    TABLE       CREATE TABLE public.comments (
    id integer NOT NULL,
    text character varying NOT NULL,
    "catId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.comments;
       public         heap    admin    false            �            1259    16390    comments_id_seq    SEQUENCE     �   CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.comments_id_seq;
       public          admin    false    211                       0    0    comments_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;
          public          admin    false    210            �            1259    16385    typeorm_metadata    TABLE     �   CREATE TABLE public.typeorm_metadata (
    type character varying NOT NULL,
    database character varying,
    schema character varying,
    "table" character varying,
    name character varying,
    value text
);
 $   DROP TABLE public.typeorm_metadata;
       public         heap    admin    false            �            1259    16418    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL
);
    DROP TABLE public.users;
       public         heap    admin    false            �            1259    16417    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          admin    false    215                       0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          admin    false    214            m           2604    16405    cats id    DEFAULT     b   ALTER TABLE ONLY public.cats ALTER COLUMN id SET DEFAULT nextval('public.cats_id_seq'::regclass);
 6   ALTER TABLE public.cats ALTER COLUMN id DROP DEFAULT;
       public          admin    false    212    213    213            j           2604    16394    comments id    DEFAULT     j   ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);
 :   ALTER TABLE public.comments ALTER COLUMN id DROP DEFAULT;
       public          admin    false    211    210    211            p           2604    16421    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          admin    false    215    214    215                      0    16402    cats 
   TABLE DATA           H   COPY public.cats (id, url, likes, "createdAt", "updatedAt") FROM stdin;
    public          admin    false    213                      0    16391    comments 
   TABLE DATA           O   COPY public.comments (id, text, "catId", "createdAt", "updatedAt") FROM stdin;
    public          admin    false    211                      0    16385    typeorm_metadata 
   TABLE DATA           X   COPY public.typeorm_metadata (type, database, schema, "table", name, value) FROM stdin;
    public          admin    false    209            	          0    16418    users 
   TABLE DATA           4   COPY public.users (id, email, password) FROM stdin;
    public          admin    false    215                       0    0    cats_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.cats_id_seq', 1, true);
          public          admin    false    212                       0    0    comments_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.comments_id_seq', 1, true);
          public          admin    false    210                       0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 3, true);
          public          admin    false    214            t           2606    16411 #   cats PK_611e3c0a930b4ddc1541422864c 
   CONSTRAINT     c   ALTER TABLE ONLY public.cats
    ADD CONSTRAINT "PK_611e3c0a930b4ddc1541422864c" PRIMARY KEY (id);
 O   ALTER TABLE ONLY public.cats DROP CONSTRAINT "PK_611e3c0a930b4ddc1541422864c";
       public            admin    false    213            r           2606    16400 '   comments PK_8bf68bc960f2b69e818bdb90dcb 
   CONSTRAINT     g   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY (id);
 S   ALTER TABLE ONLY public.comments DROP CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb";
       public            admin    false    211            v           2606    16425 $   users PK_a3ffb1c0c8416b9fc6f907b7433 
   CONSTRAINT     d   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.users DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433";
       public            admin    false    215            w           2606    16412 '   comments FK_dd6c6f81030c40659056ed1ce95    FK CONSTRAINT     �   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT "FK_dd6c6f81030c40659056ed1ce95" FOREIGN KEY ("catId") REFERENCES public.cats(id) ON DELETE CASCADE;
 S   ALTER TABLE ONLY public.comments DROP CONSTRAINT "FK_dd6c6f81030c40659056ed1ce95";
       public          admin    false    211    213    3188               �   x�-����0 �s��zK:3i�i��"X�^��.�k��D[M�|�
��0��q�E����t��q����N�K:t���B�Q+��0-�d�ɉ���6�(Ibb�m����y��r�uܱZ�F��f�s��7׿�����ySN�%@r+"���� 
&E�FRO3V���|BT�%��9�2��r8Y         4   x�3��H����4�4202�50�5�T02�2��2�г�4453�#����� ��            x������ � �      	   �   x�=�M�0 ���ͽ}Ўj��%ʲT��um����>(��lt��0���F �&d&�M�R@q���������W"�-�hQg"k>��4��9�:HN��h�M�ĳړ�'5���� ���2~V��e���)e�YXr��Z��k2     