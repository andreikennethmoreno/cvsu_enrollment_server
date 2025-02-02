PGDMP         9                |            EnrollmentSystemDatabase_    15.4    15.4 4    0           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            1           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            2           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            3           1262    16837    EnrollmentSystemDatabase_    DATABASE     �   CREATE DATABASE "EnrollmentSystemDatabase_" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Philippines.1252';
 +   DROP DATABASE "EnrollmentSystemDatabase_";
                postgres    false            �            1255    16838    generate_email()    FUNCTION     Z  CREATE FUNCTION public.generate_email() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
    generated_email VARCHAR;
    duplicate_count INT := 0;
BEGIN
    -- Generate the initial email format without spaces
    generated_email := LOWER(REPLACE(NEW.first_name, ' ', '') || '.' || REPLACE(NEW.last_name, ' ', '') || '@cvsu.ph.com');
    
    -- Check if the email already exists and increment a counter if it does
    WHILE EXISTS (SELECT 1 FROM students WHERE email = generated_email) LOOP
        duplicate_count := duplicate_count + 1;
        generated_email := LOWER(REPLACE(NEW.first_name, ' ', '') || '.' || REPLACE(NEW.last_name, ' ', '') || duplicate_count || '@cvsu.ph.com');
    END LOOP;

    -- Assign the generated email to the NEW record
    NEW.email := generated_email;

    -- Return the modified NEW record
    RETURN NEW;
END;
$$;
 '   DROP FUNCTION public.generate_email();
       public          postgres    false            �            1259    17010    advisers    TABLE     ]  CREATE TABLE public.advisers (
    id integer NOT NULL,
    first_name character varying(255) NOT NULL,
    middle_name character varying(255),
    last_name character varying(255) NOT NULL,
    program_id integer,
    contact_number character varying(255),
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);
    DROP TABLE public.advisers;
       public         heap    postgres    false            �            1259    17009    advisers_id_seq    SEQUENCE     �   CREATE SEQUENCE public.advisers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.advisers_id_seq;
       public          postgres    false    223            4           0    0    advisers_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.advisers_id_seq OWNED BY public.advisers.id;
          public          postgres    false    222            �            1259    16839    department_heads    TABLE     :  CREATE TABLE public.department_heads (
    id integer NOT NULL,
    first_name character varying(255) NOT NULL,
    middle_name character varying(255),
    last_name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    program_id integer
);
 $   DROP TABLE public.department_heads;
       public         heap    postgres    false            �            1259    16844    department_heads_head_id_seq    SEQUENCE     �   CREATE SEQUENCE public.department_heads_head_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.department_heads_head_id_seq;
       public          postgres    false    214            5           0    0    department_heads_head_id_seq    SEQUENCE OWNED BY     X   ALTER SEQUENCE public.department_heads_head_id_seq OWNED BY public.department_heads.id;
          public          postgres    false    215            �            1259    16845    programs    TABLE     l   CREATE TABLE public.programs (
    id integer NOT NULL,
    program_name character varying(255) NOT NULL
);
    DROP TABLE public.programs;
       public         heap    postgres    false            �            1259    16848    programs_id_seq    SEQUENCE     �   CREATE SEQUENCE public.programs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.programs_id_seq;
       public          postgres    false    216            6           0    0    programs_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.programs_id_seq OWNED BY public.programs.id;
          public          postgres    false    217            �            1259    16849    registrar_heads    TABLE     !  CREATE TABLE public.registrar_heads (
    id integer NOT NULL,
    first_name character varying(255) NOT NULL,
    middle_name character varying(255),
    last_name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);
 #   DROP TABLE public.registrar_heads;
       public         heap    postgres    false            �            1259    16854    registrar_heads_head_id_seq    SEQUENCE     �   CREATE SEQUENCE public.registrar_heads_head_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.registrar_heads_head_id_seq;
       public          postgres    false    218            7           0    0    registrar_heads_head_id_seq    SEQUENCE OWNED BY     V   ALTER SEQUENCE public.registrar_heads_head_id_seq OWNED BY public.registrar_heads.id;
          public          postgres    false    219            �            1259    16855    students    TABLE     �  CREATE TABLE public.students (
    id integer NOT NULL,
    first_name character varying NOT NULL,
    middle_name character varying,
    last_name character varying NOT NULL,
    email character varying NOT NULL,
    contact_number character varying,
    address character varying,
    date_of_birth date NOT NULL,
    student_type character varying NOT NULL,
    standing_year integer NOT NULL,
    semester character varying,
    password character varying NOT NULL,
    program_id integer
);
    DROP TABLE public.students;
       public         heap    postgres    false            �            1259    16860    students_student_id_seq    SEQUENCE     �   CREATE SEQUENCE public.students_student_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.students_student_id_seq;
       public          postgres    false    220            8           0    0    students_student_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.students_student_id_seq OWNED BY public.students.id;
          public          postgres    false    221            ~           2604    17013    advisers id    DEFAULT     j   ALTER TABLE ONLY public.advisers ALTER COLUMN id SET DEFAULT nextval('public.advisers_id_seq'::regclass);
 :   ALTER TABLE public.advisers ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    223    223            z           2604    16861    department_heads id    DEFAULT        ALTER TABLE ONLY public.department_heads ALTER COLUMN id SET DEFAULT nextval('public.department_heads_head_id_seq'::regclass);
 B   ALTER TABLE public.department_heads ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    214            {           2604    16862    programs id    DEFAULT     j   ALTER TABLE ONLY public.programs ALTER COLUMN id SET DEFAULT nextval('public.programs_id_seq'::regclass);
 :   ALTER TABLE public.programs ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216            |           2604    16863    registrar_heads id    DEFAULT     }   ALTER TABLE ONLY public.registrar_heads ALTER COLUMN id SET DEFAULT nextval('public.registrar_heads_head_id_seq'::regclass);
 A   ALTER TABLE public.registrar_heads ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    218            }           2604    16864    students id    DEFAULT     r   ALTER TABLE ONLY public.students ALTER COLUMN id SET DEFAULT nextval('public.students_student_id_seq'::regclass);
 :   ALTER TABLE public.students ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    220            -          0    17010    advisers 
   TABLE DATA           w   COPY public.advisers (id, first_name, middle_name, last_name, program_id, contact_number, email, password) FROM stdin;
    public          postgres    false    223   �C       $          0    16839    department_heads 
   TABLE DATA           o   COPY public.department_heads (id, first_name, middle_name, last_name, email, password, program_id) FROM stdin;
    public          postgres    false    214   �C       &          0    16845    programs 
   TABLE DATA           4   COPY public.programs (id, program_name) FROM stdin;
    public          postgres    false    216   �C       (          0    16849    registrar_heads 
   TABLE DATA           b   COPY public.registrar_heads (id, first_name, middle_name, last_name, email, password) FROM stdin;
    public          postgres    false    218   -D       *          0    16855    students 
   TABLE DATA           �   COPY public.students (id, first_name, middle_name, last_name, email, contact_number, address, date_of_birth, student_type, standing_year, semester, password, program_id) FROM stdin;
    public          postgres    false    220   �D       9           0    0    advisers_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.advisers_id_seq', 1, false);
          public          postgres    false    222            :           0    0    department_heads_head_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.department_heads_head_id_seq', 1, true);
          public          postgres    false    215            ;           0    0    programs_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.programs_id_seq', 3, true);
          public          postgres    false    217            <           0    0    registrar_heads_head_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.registrar_heads_head_id_seq', 3, true);
          public          postgres    false    219            =           0    0    students_student_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.students_student_id_seq', 153, true);
          public          postgres    false    221            �           2606    17019    advisers advisers_email_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.advisers
    ADD CONSTRAINT advisers_email_key UNIQUE (email);
 E   ALTER TABLE ONLY public.advisers DROP CONSTRAINT advisers_email_key;
       public            postgres    false    223            �           2606    17017    advisers advisers_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.advisers
    ADD CONSTRAINT advisers_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.advisers DROP CONSTRAINT advisers_pkey;
       public            postgres    false    223            �           2606    16866 &   department_heads department_heads_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.department_heads
    ADD CONSTRAINT department_heads_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.department_heads DROP CONSTRAINT department_heads_pkey;
       public            postgres    false    214            �           2606    16868    programs programs_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.programs
    ADD CONSTRAINT programs_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.programs DROP CONSTRAINT programs_pkey;
       public            postgres    false    216            �           2606    16870 $   registrar_heads registrar_heads_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.registrar_heads
    ADD CONSTRAINT registrar_heads_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.registrar_heads DROP CONSTRAINT registrar_heads_pkey;
       public            postgres    false    218            �           2606    16872    students students_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.students DROP CONSTRAINT students_pkey;
       public            postgres    false    220            �           2620    17025    advisers before_insert_adviser    TRIGGER     }   CREATE TRIGGER before_insert_adviser BEFORE INSERT ON public.advisers FOR EACH ROW EXECUTE FUNCTION public.generate_email();
 7   DROP TRIGGER before_insert_adviser ON public.advisers;
       public          postgres    false    223    224            �           2620    16873 .   department_heads before_insert_department_head    TRIGGER     �   CREATE TRIGGER before_insert_department_head BEFORE INSERT ON public.department_heads FOR EACH ROW EXECUTE FUNCTION public.generate_email();
 G   DROP TRIGGER before_insert_department_head ON public.department_heads;
       public          postgres    false    214    224            �           2620    16874 ,   registrar_heads before_insert_registrar_head    TRIGGER     �   CREATE TRIGGER before_insert_registrar_head BEFORE INSERT ON public.registrar_heads FOR EACH ROW EXECUTE FUNCTION public.generate_email();
 E   DROP TRIGGER before_insert_registrar_head ON public.registrar_heads;
       public          postgres    false    218    224            �           2620    16875    students before_insert_student    TRIGGER     }   CREATE TRIGGER before_insert_student BEFORE INSERT ON public.students FOR EACH ROW EXECUTE FUNCTION public.generate_email();
 7   DROP TRIGGER before_insert_student ON public.students;
       public          postgres    false    224    220            �           2620    17026    advisers before_update_adviser    TRIGGER     }   CREATE TRIGGER before_update_adviser BEFORE UPDATE ON public.advisers FOR EACH ROW EXECUTE FUNCTION public.generate_email();
 7   DROP TRIGGER before_update_adviser ON public.advisers;
       public          postgres    false    223    224            �           2620    16876 .   department_heads before_update_department_head    TRIGGER     �   CREATE TRIGGER before_update_department_head BEFORE UPDATE ON public.department_heads FOR EACH ROW EXECUTE FUNCTION public.generate_email();
 G   DROP TRIGGER before_update_department_head ON public.department_heads;
       public          postgres    false    214    224            �           2620    16877 ,   registrar_heads before_update_registrar_head    TRIGGER     �   CREATE TRIGGER before_update_registrar_head BEFORE UPDATE ON public.registrar_heads FOR EACH ROW EXECUTE FUNCTION public.generate_email();
 E   DROP TRIGGER before_update_registrar_head ON public.registrar_heads;
       public          postgres    false    224    218            �           2620    16878    students before_update_student    TRIGGER     }   CREATE TRIGGER before_update_student BEFORE UPDATE ON public.students FOR EACH ROW EXECUTE FUNCTION public.generate_email();
 7   DROP TRIGGER before_update_student ON public.students;
       public          postgres    false    220    224            �           2606    16879    students fk_program    FK CONSTRAINT     �   ALTER TABLE ONLY public.students
    ADD CONSTRAINT fk_program FOREIGN KEY (program_id) REFERENCES public.programs(id) ON DELETE SET NULL;
 =   ALTER TABLE ONLY public.students DROP CONSTRAINT fk_program;
       public          postgres    false    216    220    3202            �           2606    16884    department_heads fk_program    FK CONSTRAINT     �   ALTER TABLE ONLY public.department_heads
    ADD CONSTRAINT fk_program FOREIGN KEY (program_id) REFERENCES public.programs(id) ON DELETE SET NULL;
 E   ALTER TABLE ONLY public.department_heads DROP CONSTRAINT fk_program;
       public          postgres    false    216    3202    214            �           2606    17020    advisers fk_program    FK CONSTRAINT     �   ALTER TABLE ONLY public.advisers
    ADD CONSTRAINT fk_program FOREIGN KEY (program_id) REFERENCES public.programs(id) ON DELETE SET NULL;
 =   ALTER TABLE ONLY public.advisers DROP CONSTRAINT fk_program;
       public          postgres    false    216    223    3202            -      x������ � �      $   '   x�3�LI-(A#�@�CrYq�^A�^r~.Dʐ+F��� ��      &   ,   x�3�tJL�H��/R�OSp��-(-I-RN�L�KN����� ݥK      (   e   x�3�,JM�,�R`RL:$���d�%��r�%��X�g�UF�f�y��V$�����G��FWTy9E9Z[���W��q��qqq 9�!F      *   �   x�]�Ak�@��oE��oc���FR҂�I�l7�Y��$����7Rmaf�9|4�!c�/�O�F<�h�D�<��0�Q�/n�����T�������=(P��X}�$��G�ҵ�o��q�KsMw��w��Yw�X��T�߰Xy��_h�e)T���v�ն�%-���3a��/�JgY>_�^�Z;�D���� g�f:��U�Q�rP:     