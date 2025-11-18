import React, { useEffect, useState } from "react";
import {
  IonCard,
  IonContent,
  IonIcon,
  IonPage,
  IonPopover,
  IonTitle,
  IonItem,
  IonButton,
  IonBadge,
  IonLabel,
  IonImg,
} from "@ionic/react";
import {
  alertCircleOutline,
  time,
  closeCircleOutline,
  refresh,
} from "ionicons/icons";
import "./Acertijos.css";

type NivelFlujoId = "basico" | "intermedio" | "avanzado";

type ProblematicaFlujoId =
  | "basico_bio_1"
  | "basico_bio_2"
  | "basico_bio_3"
  | "basico_bio_4"
  | "basico_bio_5"
  | "basico_mat_1"
  | "basico_mat_2"
  | "basico_mat_3"
  | "basico_mat_4"
  | "basico_mat_5"
  | "intermedio_org_1"
  | "intermedio_org_2"
  | "intermedio_org_3"
  | "intermedio_org_4"
  | "intermedio_org_5"
  | "intermedio_org_6"
  | "intermedio_org_7"
  | "intermedio_org_8"
  | "intermedio_geo_1"
  | "intermedio_geo_2"
  | "intermedio_geo_3"
  | "intermedio_geo_4"
  | "intermedio_geo_5"
  | "intermedio_geo_6"
  | "intermedio_geo_7"
  | "intermedio_geo_8"
  | "avanzado_vac_1"
  | "avanzado_vac_2"
  | "avanzado_vac_3"
  | "avanzado_vac_4"
  | "avanzado_vac_5"
  | "avanzado_vac_6"
  | "avanzado_vac_7"
  | "avanzado_vac_8"
  | "avanzado_vac_9"
  | "avanzado_vac_10"
  | "avanzado_geo3d_1"
  | "avanzado_geo3d_2"
  | "avanzado_geo3d_3"
  | "avanzado_geo3d_4"
  | "avanzado_geo3d_5"
  | "avanzado_geo3d_6"
  | "avanzado_geo3d_7"
  | "avanzado_geo3d_8"
  | "avanzado_geo3d_9"
  | "avanzado_geo3d_10";

interface RespuestaOpcion {
  texto: string;
  esCorrecta: boolean;
  icono: string;
}

interface EscenarioFlujo {
  id: ProblematicaFlujoId;
  titulo: string;
  acertijo: string;
  respuestas: RespuestaOpcion[];
}

type DiccionarioFlujo = Record<NivelFlujoId, EscenarioFlujo[]>;

const diccionarioFlujo: DiccionarioFlujo = {
  basico: [
    {
      id: "basico_bio_1",
      titulo: "Fotosíntesis en plantas",
      acertijo:
        "No me alimento como tú ni como un animal; con luz, agua y aire fabrico mi pan. ¿Qué proceso realizo?",
      respuestas: [
        {
          texto: "Fotosíntesis",
          esCorrecta: true,
          icono: "/icons/fotosintesis.png",
        },
        {
          texto: "Respiración",
          esCorrecta: false,
          icono: "/icons/respiracion.png",
        },
        {
          texto: "Reproducción",
          esCorrecta: false,
          icono: "/icons/reproduccion.png",
        },
      ],
    },
    {
      id: "basico_bio_2",
      titulo: "Respiración en plantas",
      acertijo:
        "No tengo pulmones como tú, pero día y noche respiro. Tomo aire por mis poros y en silencio sigo vivo. ¿Qué proceso realizo?",
      respuestas: [
        {
          texto: "Digestión",
          esCorrecta: false,
          icono: "/icons/digestion.png",
        },
        {
          texto: "Respiración",
          esCorrecta: true,
          icono: "/icons/respiracion.png",
        },
        {
          texto: "Excreción",
          esCorrecta: false,
          icono: "/icons/excrecion.png",
        },
      ],
    },
    {
      id: "basico_bio_3",
      titulo: "Seres autótrofos",
      acertijo:
        "No necesito pedir comida ni pedir comida para llevar. Yo mismo me la preparo, ¿cómo me puedo llamar?",
      respuestas: [
        { texto: "Autótrofo", esCorrecta: true, icono: "/icons/autotrofo.png" },
        {
          texto: "Heterótrofo",
          esCorrecta: false,
          icono: "/icons/heterotrofo.png",
        },
        {
          texto: "Trofólogo",
          esCorrecta: false,
          icono: "/icons/trofologo.png",
        },
      ],
    },
    {
      id: "basico_bio_4",
      titulo: "Reproducción en plantas",
      acertijo:
        "De una semillita salgo yo, y luego hago miles más. Soy un proceso que hace copias para que la vida continúe sin parar. ¿Quién soy?",
      respuestas: [
        {
          texto: "Nutrición",
          esCorrecta: false,
          icono: "/icons/nutricion.png",
        },
        {
          texto: "Reproducción",
          esCorrecta: true,
          icono: "/icons/reproduccion.png",
        },
        {
          texto: "Deporte vegetal",
          esCorrecta: false,
          icono: "/icons/deporte_vegetal.png",
        },
      ],
    },
    {
      id: "basico_bio_5",
      titulo: "Fototropismo",
      acertijo:
        "Aunque no tengo pies ni ruedas, me muevo sin caminar. Si la luz aparece, hacia ella me verás girar. ¿Qué soy?",
      respuestas: [
        {
          texto: "Fototropismo",
          esCorrecta: true,
          icono: "/icons/fototropismo.png",
        },
        {
          texto: "Hibernación",
          esCorrecta: false,
          icono: "/icons/hibernacion.png",
        },
        {
          texto: "Fotosíntesis",
          esCorrecta: false,
          icono: "/icons/fotosintesis.png",
        },
      ],
    },
    {
      id: "basico_mat_1",
      titulo: "Edad de Ana",
      acertijo:
        "Ana tiene el doble de años que Luis. Si entre los dos suman 18 años, ¿cuántos años tiene Ana?",
      respuestas: [
        { texto: "6", esCorrecta: false, icono: "/icons/" },
        { texto: "12", esCorrecta: true, icono: "/icons/" },
        { texto: "9", esCorrecta: false, icono: "/icons/" },
      ],
    },
    {
      id: "basico_mat_2",
      titulo: "Fracción de pizza",
      acertijo:
        "Tenías 3/4 de una pizza. Te comes la mitad de lo que tenías. ¿Qué fracción de la pizza comiste?",
      respuestas: [
        { texto: "3/8", esCorrecta: true, icono: "/icons/" },
        { texto: "1/4", esCorrecta: false, icono: "/icons/" },
        { texto: "1/2", esCorrecta: false, icono: "/icons/" },
      ],
    },
    {
      id: "basico_mat_3",
      titulo: "Canicas de B",
      acertijo:
        "A, B y C tienen canicas. A tiene el doble que B, y C tiene 5 menos que A. Si entre los tres suman 30 canicas, ¿cuántas tiene B?",
      respuestas: [
        { texto: "5", esCorrecta: false, icono: "/icons/" },
        { texto: "7", esCorrecta: true, icono: "/icons/" },
        { texto: "10", esCorrecta: false, icono: "/icons/" },
      ],
    },
    {
      id: "basico_mat_4",
      titulo: "Número de dos cifras",
      acertijo:
        "Soy un número de dos cifras. La cifra de las decenas es 3 veces la cifra de las unidades, y la suma de mis cifras es 12. ¿Quién soy?",
      respuestas: [
        { texto: "39", esCorrecta: false, icono: "/icons/" },
        { texto: "84", esCorrecta: false, icono: "/icons/" },
        { texto: "93", esCorrecta: true, icono: "/icons/" },
      ],
    },
    {
      id: "basico_mat_5",
      titulo: "Múltiplo de 5 y 7",
      acertijo:
        "¿Cuál es el número más pequeño mayor que 100 que es divisible tanto por 5 como por 7?",
      respuestas: [
        { texto: "105", esCorrecta: true, icono: "/icons/" },
        { texto: "110", esCorrecta: false, icono: "/icons/" },
        { texto: "140", esCorrecta: false, icono: "/icons/" },
      ],
    },
  ],

  intermedio: [
    {
      id: "intermedio_org_1",
      titulo: "Cerebro",
      acertijo:
        "Sin mí no puedes pensar, soñar ni recordar. Coordino lo que haces sin descansar. ¿Quién soy?",
      respuestas: [
        { texto: "Corazón", esCorrecta: false, icono: "/icons/" },
        { texto: "Cerebro", esCorrecta: true, icono: "/icons/" },
        { texto: "Estómago", esCorrecta: false, icono: "/icons/" },
      ],
    },
    {
      id: "intermedio_org_2",
      titulo: "Pulmones",
      acertijo:
        "Me inflo y me desinflo sin parar, gracias a mí puedes saltar, hablar y respirar. ¿Quién soy?",
      respuestas: [
        { texto: "Pulmones", esCorrecta: true, icono: "/icons/" },
        { texto: "Hígado", esCorrecta: false, icono: "/icons/" },
        { texto: "Riñones", esCorrecta: false, icono: "/icons/" },
      ],
    },
    {
      id: "intermedio_org_3",
      titulo: "Estómago",
      acertijo:
        "Soy un saco que nunca cocina, pero con jugos y ácidos la comida tritura. ¿Quién soy?",
      respuestas: [
        { texto: "Estómago", esCorrecta: true, icono: "/icons/" },
        { texto: "Intestino", esCorrecta: false, icono: "/icons/" },
        { texto: "Páncreas", esCorrecta: false, icono: "/icons/" },
      ],
    },
    {
      id: "intermedio_org_4",
      titulo: "Riñones",
      acertijo:
        "Somos dos y trabajamos en silencio, limpiamos la sangre y expulsamos lo que no tiene uso. ¿Quiénes somos?",
      respuestas: [
        { texto: "Pulmones", esCorrecta: false, icono: "/icons/" },
        { texto: "Riñones", esCorrecta: true, icono: "/icons/" },
        { texto: "Corazón", esCorrecta: false, icono: "/icons/" },
      ],
    },
    {
      id: "intermedio_org_5",
      titulo: "Hígado",
      acertijo:
        "Transformo lo que comes, limpio tu sangre y te ayudo a digerir. Sin mí, te costaría mucho vivir. ¿Quién soy?",
      respuestas: [
        { texto: "Páncreas", esCorrecta: false, icono: "/icons/" },
        { texto: "Hígado", esCorrecta: true, icono: "/icons/" },
        { texto: "Estómago", esCorrecta: false, icono: "/icons/" },
      ],
    },
    {
      id: "intermedio_org_6",
      titulo: "Intestino delgado",
      acertijo:
        "Soy largo, delgado y estoy en tu barriga. De lo que comes, tomo lo bueno y lo envío a la sangre enseguida. ¿Quién soy?",
      respuestas: [
        { texto: "Intestino grueso", esCorrecta: false, icono: "/icons/" },
        { texto: "Intestino delgado", esCorrecta: true, icono: "/icons/" },
        { texto: "Páncreas", esCorrecta: false, icono: "/icons/" },
      ],
    },
    {
      id: "intermedio_org_7",
      titulo: "Músculo",
      acertijo:
        "Gracias a mí puedes brincar, correr y abrazar. Me estiro y me encojo para poder moverte sin parar. ¿Quién soy?",
      respuestas: [
        { texto: "Músculo", esCorrecta: true, icono: "/icons/" },
        { texto: "Hueso", esCorrecta: false, icono: "/icons/" },
        { texto: "Cerebro", esCorrecta: false, icono: "/icons/" },
      ],
    },
    {
      id: "intermedio_org_8",
      titulo: "Ojo",
      acertijo:
        "Abro y cierro mis cortinas cada día, y con mi ayuda ves colores, formas y alegría. ¿Quién soy?",
      respuestas: [
        { texto: "Oído", esCorrecta: false, icono: "/icons/" },
        { texto: "Ojo", esCorrecta: true, icono: "/icons/" },
        { texto: "Nariz", esCorrecta: false, icono: "/icons/" },
      ],
    },

    {
      id: "intermedio_geo_1",
      titulo: "Cuadrado",
      acertijo:
        "Todos mis lados son iguales, y mis ángulos son perfectos y rectales. ¿Quién soy?",
      respuestas: [
        { texto: "Cuadrado", esCorrecta: true, icono: "/icons/" },
        { texto: "Rectángulo", esCorrecta: false, icono: "/icons/" },
        { texto: "Rombo", esCorrecta: false, icono: "/icons/" },
      ],
    },
    {
      id: "intermedio_geo_2",
      titulo: "Rombo",
      acertijo:
        "Parezco un cuadrado girado, todos mis lados son iguales, pero mis ángulos algo inclinados. ¿Quién soy?",
      respuestas: [
        { texto: "Trapecio", esCorrecta: false, icono: "/icons/" },
        { texto: "Rombo", esCorrecta: true, icono: "/icons/" },
        { texto: "Hexágono", esCorrecta: false, icono: "/icons/" },
      ],
    },
    {
      id: "intermedio_geo_3",
      titulo: "Pentágono",
      acertijo:
        "Si dibujas una estrella, seguro me ves, porque soy el polígono con cinco pies. ¿Quién soy?",
      respuestas: [
        { texto: "Pentágono", esCorrecta: true, icono: "/icons/" },
        { texto: "Hexágono", esCorrecta: false, icono: "/icons/" },
        { texto: "Heptágono", esCorrecta: false, icono: "/icons/" },
      ],
    },
    {
      id: "intermedio_geo_4",
      titulo: "Hexágono",
      acertijo:
        "Las abejas me usan para construir su hogar, tengo seis lados iguales, ¡me encanta trabajar! ¿Quién soy?",
      respuestas: [
        { texto: "Hexágono", esCorrecta: true, icono: "/icons/" },
        { texto: "Octágono", esCorrecta: false, icono: "/icons/" },
        { texto: "Heptágono", esCorrecta: false, icono: "/icons/" },
      ],
    },
    {
      id: "intermedio_geo_5",
      titulo: "Octágono",
      acertijo:
        "Cuando manejas, me ves en la esquina, tengo ocho lados y una forma divina. ¿Quién soy?",
      respuestas: [
        { texto: "Octágono", esCorrecta: true, icono: "/icons/" },
        { texto: "Hexágono", esCorrecta: false, icono: "/icons/" },
        { texto: "Decágono", esCorrecta: false, icono: "/icons/" },
      ],
    },
    {
      id: "intermedio_geo_6",
      titulo: "Círculo",
      acertijo:
        "No tengo lados ni puntas tampoco, pero si me lanzas, ruedo poco a poco. ¿Quién soy?",
      respuestas: [
        { texto: "Círculo", esCorrecta: true, icono: "/icons/" },
        { texto: "Elipse", esCorrecta: false, icono: "/icons/" },
        { texto: "Óvalo", esCorrecta: false, icono: "/icons/" },
      ],
    },
    {
      id: "intermedio_geo_7",
      titulo: "Semicírculo",
      acertijo:
        "Nací del círculo al partirlo en dos, parezco una sonrisa si me ves con atención. ¿Quién soy?",
      respuestas: [
        { texto: "Trapecio", esCorrecta: false, icono: "/icons/" },
        { texto: "Triángulo", esCorrecta: false, icono: "/icons/" },
        { texto: "Semicírculo", esCorrecta: true, icono: "/icons/" },
      ],
    },
    {
      id: "intermedio_geo_8",
      titulo: "Trapecio",
      acertijo:
        "Tengo cuatro lados, pero solo dos son paralelos. Parecen mis techos inclinados, ¡no soy nada feo! ¿Quién soy?",
      respuestas: [
        { texto: "Romboide", esCorrecta: false, icono: "/icons/" },
        { texto: "Trapecio", esCorrecta: true, icono: "/icons/" },
        { texto: "Triángulo", esCorrecta: false, icono: "/icons/" },
      ],
    },
  ],

  avanzado: [
    {
      id: "avanzado_vac_1",
      titulo: "Triple viral (SRP)",
      acertijo:
        "Provoco fiebre, tos y puntitos rojos en la piel, soy muy contagioso y salto de niño en niño también. Gracias a una vacuna triple, ya no doy tanto miedo. ¿Qué vacuna me derrota?",
      respuestas: [
        {
          texto: "Varicela",
          esCorrecta: false,
          icono: "/icons/",
        },
        {
          texto: "Triple viral (SRP: Sarampión, Rubéola y Paperas)",
          esCorrecta: true,
          icono: "/icons/",
        },
        {
          texto: "Rotavirus",
          esCorrecta: false,
          icono: "/icons/",
        },
      ],
    },
    {
      id: "avanzado_vac_2",
      titulo: "DTP",
      acertijo:
        "Te dejo sin aire con mi garganta inflamada, y antes mi ataque era una cosa muy temida. Una vacuna con tres nombres me detuvo enseguida. ¿Qué vacuna me detiene?",
      respuestas: [
        {
          texto: "DTP (Difteria, Tétanos y Tos ferina)",
          esCorrecta: true,
          icono: "/icons/",
        },
        { texto: "BCG", esCorrecta: false, icono: "/icons/" },
        { texto: "Hepatitis B", esCorrecta: false, icono: "/icons/" },
      ],
    },
    {
      id: "avanzado_vac_3",
      titulo: "Polio",
      acertijo:
        "Me gusta esconderme en los nervios y dejarte sin mover, antes muchos niños no podían correr. Pero con una vacuna oral me hicieron desaparecer. ¿Qué vacuna me frena?",
      respuestas: [
        { texto: "Triple viral", esCorrecta: false, icono: "/icons/" },
        {
          texto: "Polio (Sabin o IPV)",
          esCorrecta: true,
          icono: "/icons/",
        },
        { texto: "Rotavirus", esCorrecta: false, icono: "/icons/" },
      ],
    },
    {
      id: "avanzado_vac_4",
      titulo: "Tétanos / DTP",
      acertijo:
        "Si te cortas y no estás protegido, te dejo tieso y adolorido. Por suerte, hay una vacuna que evita el peligro. ¿Qué vacuna me detiene?",
      respuestas: [
        { texto: "Hepatitis A", esCorrecta: false, icono: "/icons/" },
        {
          texto: "DTP (Difteria, Tétanos y Tos ferina)",
          esCorrecta: true,
          icono: "/icons/",
        },
        { texto: "BCG", esCorrecta: false, icono: "/icons/" },
      ],
    },
    {
      id: "avanzado_vac_5",
      titulo: "Hepatitis A",
      acertijo:
        "Me escondo en el agua y la comida contaminada, y dejo tu piel amarilla y cansada. Con una vacuna sencilla quedo derrotada. ¿Qué vacuna me frena?",
      respuestas: [
        { texto: "Neumocócica", esCorrecta: false, icono: "/icons/" },
        { texto: "Hepatitis A", esCorrecta: true, icono: "/icons/" },
        { texto: "Hepatitis B", esCorrecta: false, icono: "/icons/" },
      ],
    },
    {
      id: "avanzado_vac_6",
      titulo: "Paperas / triple viral",
      acertijo:
        "Me encanta inflar tu cara y causar fiebre, antes era común entre niños y mujeres. Una vacuna triple me deja sin poderes. ¿Qué vacuna me vence?",
      respuestas: [
        { texto: "Triple viral (SRP)", esCorrecta: true, icono: "/icons/" },
        { texto: "Hepatitis A", esCorrecta: false, icono: "/icons/" },
        { texto: "DTP", esCorrecta: false, icono: "/icons/" },
      ],
    },
    {
      id: "avanzado_vac_7",
      titulo: "Rotavirus",
      acertijo:
        "Provoco diarrea y vómito sin parar, especialmente en bebés al empezar. Con unas gotitas en la boca me puedes derrotar. ¿Qué vacuna me detiene?",
      respuestas: [
        { texto: "Neumocócica", esCorrecta: false, icono: "/icons/" },
        { texto: "Rotavirus", esCorrecta: true, icono: "/icons/" },
        { texto: "Hepatitis A", esCorrecta: false, icono: "/icons/" },
      ],
    },
    {
      id: "avanzado_vac_8",
      titulo: "BCG",
      acertijo:
        "Entro por el aire y ataco los pulmones, dejo tos y cansancio por montones. Una vacuna deja marca en el brazo, y me detiene con gran abrazo. ¿Qué vacuna me vence?",
      respuestas: [
        { texto: "BCG", esCorrecta: true, icono: "/icons/" },
        { texto: "DTP", esCorrecta: false, icono: "/icons/" },
        { texto: "Influenza", esCorrecta: false, icono: "/icons/" },
      ],
    },
    {
      id: "avanzado_vac_9",
      titulo: "Influenza",
      acertijo:
        "Cada año cambio de disfraz, te hago estornudar y moquear sin paz. Una vacuna anual me pone un alto eficaz. ¿Qué vacuna me detiene?",
      respuestas: [
        { texto: "Influenza", esCorrecta: true, icono: "/icons/" },
        { texto: "COVID-19", esCorrecta: false, icono: "/icons/" },
        { texto: "Neumocócica", esCorrecta: false, icono: "/icons/" },
      ],
    },
    {
      id: "avanzado_vac_10",
      titulo: "Varicela",
      acertijo:
        "Dejo granitos que dan picazón, y aunque soy leve, provoco irritación. Una vacuna evita mi invasión. ¿Qué vacuna me frena?",
      respuestas: [
        { texto: "Rotavirus", esCorrecta: false, icono: "/icons/" },
        { texto: "Varicela", esCorrecta: true, icono: "/icons/" },
        { texto: "Triple viral", esCorrecta: false, icono: "/icons/" },
      ],
    },
    {
      id: "avanzado_geo3d_1",
      titulo: "Prisma rectangular",
      acertijo:
        "Tengo 6 caras rectangulares y todas se enfrentan con orden, guardo cosas, soy práctico y me encuentras en cualquier rincón. ¿Quién soy?",
      respuestas: [
        { texto: "Cubo", esCorrecta: false, icono: "/icons/" },
        { texto: "Prisma rectangular", esCorrecta: true, icono: "/icons/" },
        { texto: "Pirámide", esCorrecta: false, icono: "/icons/" },
      ],
    },
    {
      id: "avanzado_geo3d_2",
      titulo: "Cubo",
      acertijo:
        "Tengo 6 caras cuadradas, 8 vértices y 12 aristas bien contadas. Me usan en los juegos y también en matemáticas.",
      respuestas: [
        { texto: "Esfera", esCorrecta: false, icono: "/icons/" },
        { texto: "Cilindro", esCorrecta: false, icono: "/icons/" },
        { texto: "Cubo", esCorrecta: true, icono: "/icons/" },
      ],
    },
    {
      id: "avanzado_geo3d_3",
      titulo: "Prisma",
      acertijo:
        "Tengo dos bases iguales y paralelas, mis caras laterales son rectángulos. Puedo ser triangular, cuadrangular o hexagonal.",
      respuestas: [
        { texto: "Prisma", esCorrecta: true, icono: "/icons/" },
        { texto: "Pirámide", esCorrecta: false, icono: "/icons/" },
        { texto: "Cono", esCorrecta: false, icono: "/icons/" },
      ],
    },
    {
      id: "avanzado_geo3d_4",
      titulo: "Pirámide",
      acertijo:
        "Tengo una base que puede ser cuadrada o triangular, y todas mis caras laterales se encuentran en un punto al brillar.",
      respuestas: [
        { texto: "Cilindro", esCorrecta: false, icono: "/icons/" },
        { texto: "Pirámide", esCorrecta: true, icono: "/icons/" },
        { texto: "Prisma", esCorrecta: false, icono: "/icons/" },
      ],
    },
    {
      id: "avanzado_geo3d_5",
      titulo: "Esfera",
      acertijo:
        "No tengo vértices ni caras planas, ruedo sin parar y soy totalmente suave. ¿Quién soy?",
      respuestas: [
        { texto: "Esfera", esCorrecta: true, icono: "/icons/" },
        { texto: "Cono", esCorrecta: false, icono: "/icons/" },
        { texto: "Cilindro", esCorrecta: false, icono: "/icons/" },
      ],
    },
    {
      id: "avanzado_geo3d_6",
      titulo: "Cilindro",
      acertijo:
        "Tengo dos círculos arriba y abajo, y un cuerpo recto que parece un tubo. Sirvo para guardar agua o lápices, según tu gusto.",
      respuestas: [
        { texto: "Cono", esCorrecta: false, icono: "/icons/" },
        { texto: "Cilindro", esCorrecta: true, icono: "/icons/" },
        { texto: "Prisma", esCorrecta: false, icono: "/icons/" },
      ],
    },
    {
      id: "avanzado_geo3d_7",
      titulo: "Cono",
      acertijo:
        "Tengo una base redonda y un solo vértice arriba, si me giras parezco un helado o una colina.",
      respuestas: [
        { texto: "Cono", esCorrecta: true, icono: "/icons/" },
        { texto: "Esfera", esCorrecta: false, icono: "/icons/" },
        { texto: "Pirámide", esCorrecta: false, icono: "/icons/" },
      ],
    },
    {
      id: "avanzado_geo3d_8",
      titulo: "Tetraedro",
      acertijo:
        "Tengo 4 caras, todas son triángulos iguales, no tengo base diferente ni lados desiguales.",
      respuestas: [
        { texto: "Tetraedro", esCorrecta: true, icono: "/icons/" },
        { texto: "Octaedro", esCorrecta: false, icono: "/icons/" },
        { texto: "Prisma triangular", esCorrecta: false, icono: "/icons/" },
      ],
    },
    {
      id: "avanzado_geo3d_9",
      titulo: "Octaedro",
      acertijo:
        "Parezco dos pirámides pegadas por la base, mis 8 caras son triángulos, ¡qué elegancia y clase!",
      respuestas: [
        { texto: "Octaedro", esCorrecta: true, icono: "/icons/" },
        { texto: "Dodecaedro", esCorrecta: false, icono: "/icons/" },
        { texto: "Prisma hexagonal", esCorrecta: false, icono: "/icons/" },
      ],
    },
    {
      id: "avanzado_geo3d_10",
      titulo: "Dodecaedro",
      acertijo:
        "Mis caras son pentágonos perfectos, y aunque soy difícil de dibujar, ¡soy muy geométrico y correcto!",
      respuestas: [
        { texto: "Dodecaedro", esCorrecta: true, icono: "/icons/" },
        { texto: "Icosaedro", esCorrecta: false, icono: "/icons/" },
        { texto: "Cubo", esCorrecta: false, icono: "/icons/" },
      ],
    },
  ],
};

type OrdenamientoProps = {
  nivel?: string;
  problematicas?: ProblematicaFlujoId[];
  steps?: number;
};

type NivelId = "basico" | "intermedio" | "avanzado";

const Acertijos: React.FC<OrdenamientoProps> = ({
  nivel = "basic",
  problematicas,
}) => {
  const configuracionNiveles: Record<
    NivelId,
    {
      numeroJuegos: number;
      puntosPorJuego: number;
      tiempoPorJuego: number;
    }
  > = {
    basico: {
      numeroJuegos: 3,
      puntosPorJuego: 10,
      tiempoPorJuego: 1,
    },
    intermedio: {
      numeroJuegos: 5,
      puntosPorJuego: 15,
      tiempoPorJuego: 1.4,
    },
    avanzado: {
      numeroJuegos: 7,
      puntosPorJuego: 20,
      tiempoPorJuego: 2.2,
    },
  };

  const normalizarNivelConfig = (n: string): NivelId =>
    ({
      basico: "basico",
      basic: "basico",
      intermedio: "intermedio",
      intermediate: "intermedio",
      avanzado: "avanzado",
      advanced: "avanzado",
    }[n] || "basico");

  const [appName] = useState("Juego de acertijos STEAM");
  const [appAutor] = useState("STEAM-G");
  const [appVersion] = useState("1.0.0");
  const [appFecha] = useState("16 de Noviembre del 2025");
  const [appDescripcion] = useState(
    "Lee el acertijo y selecciona la respuesta correcta antes de que termine el tiempo."
  );

  const [showInstructions, setShowInstructions] = useState<boolean>(false);
  const [indiceJuegoActual, setIndiceJuegoActual] = useState(0);

  const [nivelConfig] = useState<string>(nivel);
  const nivelConfigKey = normalizarNivelConfig(nivelConfig);
  const config = configuracionNiveles[nivelConfigKey];

  const [tiempoRestante, setTiempoRestante] = useState(() => {
    return config.tiempoPorJuego * 60;
  });
  const [puntuacionTotal, setPuntuacionTotal] = useState(0);
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [juegosCompletados, setJuegosCompletados] = useState(0);
  const [juegosFallados, setJuegosFallados] = useState(0);

  const [mensajeResultado, setMensajeResultado] = useState<string | null>(null);
  const [juegoActualCompletado, setJuegoActualCompletado] = useState(false);

  const [overlayFinJuego, setOverlayFinJuego] = useState<{
    abierto: boolean;
    puntosObtenidos: number;
  }>({
    abierto: false,
    puntosObtenidos: 0,
  });

  const [overlayTiempoAgotado, setOverlayTiempoAgotado] =
    useState<boolean>(false);

  const [overlayResumenFinal, setOverlayResumenFinal] =
    useState<boolean>(false);

  const escenariosNivelBase = diccionarioFlujo[nivelConfigKey];

  const escenariosSeleccionados: EscenarioFlujo[] =
    problematicas && problematicas.length > 0
      ? problematicas
          .map((id) =>
            escenariosNivelBase.find((escenario) => escenario.id === id)
          )
          .filter((escenario): escenario is EscenarioFlujo => !!escenario)
      : escenariosNivelBase.slice(
          0,
          configuracionNiveles[nivelConfigKey].numeroJuegos
        );

  const totalJuegos = escenariosSeleccionados.length || 1;

  const escenarioActual: EscenarioFlujo =
    escenariosSeleccionados[indiceJuegoActual] ||
    escenariosSeleccionados[0] ||
    escenariosNivelBase[0];

  const [respuestaSeleccionada, setRespuestaSeleccionada] =
    useState<RespuestaOpcion | null>(null);

  const [ultimaRespuestaCorrecta, setUltimaRespuestaCorrecta] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    setJuegoActualCompletado(false);
    setMensajeResultado(null);
    setRespuestaSeleccionada(null);
    setUltimaRespuestaCorrecta(null);
  }, [indiceJuegoActual]);

  const handleRespuestaSeleccionada = (respuesta: RespuestaOpcion) => {
    if (juegoTerminado || overlayFinJuego.abierto || overlayTiempoAgotado) {
      return;
    }

    setRespuestaSeleccionada(respuesta);
    setUltimaRespuestaCorrecta(respuesta.esCorrecta);

    if (respuesta.esCorrecta) {
      const puntosObtenidos = config.puntosPorJuego;
      setPuntuacionTotal((prev) => prev + puntosObtenidos);
      setJuegosCompletados((prev) => prev + 1);
      setJuegoActualCompletado(true);
      setMensajeResultado("¡Respuesta correcta!");
      setOverlayFinJuego({
        abierto: true,
        puntosObtenidos,
      });
    } else {
      setMensajeResultado("Respuesta incorrecta, inténtalo de nuevo.");
    }
  };

  const avanzarAlSiguienteJuego = () => {
    const esUltimoJuego = indiceJuegoActual + 1 >= totalJuegos;

    if (esUltimoJuego) {
      setJuegoTerminado(true);
      setOverlayResumenFinal(true);
      return;
    }

    setIndiceJuegoActual((prev) => prev + 1);
    setTiempoRestante(config.tiempoPorJuego * 60);
    setMensajeResultado(null);
  };

  const handleCerrarOverlayFinJuego = () => {
    setOverlayFinJuego((prev) => ({ ...prev, abierto: false }));
    avanzarAlSiguienteJuego();
  };

  const handleCerrarOverlayTiempoAgotado = () => {
    setOverlayTiempoAgotado(false);
    setJuegosFallados((prev) => prev + 1);
    avanzarAlSiguienteJuego();
  };

  const handleCerrarOverlayResumenFinal = () => {
    setOverlayResumenFinal(false);
  };

  useEffect(() => {
    if (
      juegoTerminado ||
      tiempoRestante <= 0 ||
      overlayFinJuego.abierto ||
      overlayTiempoAgotado
    ) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setTiempoRestante((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [
    juegoTerminado,
    tiempoRestante,
    overlayFinJuego.abierto,
    overlayTiempoAgotado,
  ]);

  useEffect(() => {
    if (tiempoRestante === 0 && !juegoTerminado && !juegoActualCompletado) {
      setOverlayTiempoAgotado(true);
    }
  }, [tiempoRestante, juegoTerminado, juegoActualCompletado]);

  useEffect(() => {
    if (!overlayFinJuego.abierto) return;

    const timeoutId = window.setTimeout(() => {
      handleCerrarOverlayFinJuego();
    }, 4000);

    return () => window.clearTimeout(timeoutId);
  }, [overlayFinJuego.abierto]);

  useEffect(() => {
    if (!overlayTiempoAgotado) return;

    const timeoutId = window.setTimeout(() => {
      handleCerrarOverlayTiempoAgotado();
    }, 4000);

    return () => window.clearTimeout(timeoutId);
  }, [overlayTiempoAgotado]);

  const formatearTiempo = (segundos: number) => {
    const minutos = Math.floor(segundos / 60);
    const segs = segundos % 60;
    return `${minutos}:${segs.toString().padStart(2, "0")}`;
  };

  const reiniciarJuego = () => {
    const primerEscenario = escenariosSeleccionados[0] || escenarioActual;

    setJuegoTerminado(false);
    setOverlayResumenFinal(false);
    setOverlayTiempoAgotado(false);
    setOverlayFinJuego({ abierto: false, puntosObtenidos: 0 });

    setIndiceJuegoActual(0);

    setTiempoRestante(config.tiempoPorJuego * 60);
    setPuntuacionTotal(0);
    setJuegosCompletados(0);
    setJuegosFallados(0);
    setMensajeResultado(null);
    setJuegoActualCompletado(false);
  };

  const generarConfeti = () => {
    const colores = [
      "#ff0000",
      "#00ff00",
      "#0000ff",
      "#ffff00",
      "#ff00ff",
      "#00ffff",
    ];

    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      color: colores[Math.floor(Math.random() * colores.length)],
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 2,
    }));
  };

  return (
    <IonPage>
      <IonContent>
        <div className="header-game ion-no-border">
          <div className="toolbar-game">
            <div className="titles">
              <h1>STEAM-G</h1>
              <IonIcon
                icon={alertCircleOutline}
                size="small"
                id="info-diagrama"
              />
              <IonPopover
                trigger="info-diagrama"
                side="bottom"
                alignment="center"
              >
                <IonCard className="filter-card ion-no-margin">
                  <div className="section header-section">
                    <h2>{appName}</h2>
                  </div>

                  <div className="section description-section">
                    <p>{appDescripcion}</p>
                  </div>

                  <div className="section footer-section">
                    <span>{appFecha}</span>
                  </div>
                </IonCard>
              </IonPopover>
            </div>
            <span>
              <strong>Autor:</strong> {appAutor} | <strong>Versión:</strong>{" "}
              {appVersion}
            </span>
          </div>
        </div>

        <div className="juego-container">
          <IonTitle
            className="ion-text-center instructions"
            onClick={() => setShowInstructions(true)}
          >
            Instrucciones
          </IonTitle>

          <div className="info">
            <div className="num-words">
              <strong>
                Juego {indiceJuegoActual + 1} de {totalJuegos}
              </strong>
            </div>
            <div className="temporizador">
              <IonIcon icon={time} className="icono-tiempo" />
              <h5 className="tiempo-display">
                {formatearTiempo(tiempoRestante)}
              </h5>
            </div>
            <div className="num-words">
              <strong>Puntuación: {puntuacionTotal}</strong>
            </div>
          </div>

          <div className="game">
            <div className="acertijo-card">
              <p>{escenarioActual.acertijo}</p>
            </div>

            <div className="respuestas-container">
              {escenarioActual.respuestas.map((respuesta, index) => {
                const esSeleccionada = respuestaSeleccionada === respuesta;

                const clasesAdicionales =
                  esSeleccionada && ultimaRespuestaCorrecta === true
                    ? " respuesta-card-correcta"
                    : esSeleccionada && ultimaRespuestaCorrecta === false
                    ? " respuesta-card-incorrecta"
                    : "";

                return (
                  <IonCard
                    key={index}
                    className={"respuesta-card respuesta-card-entrada" + clasesAdicionales}
                    button
                    onClick={() => handleRespuestaSeleccionada(respuesta)}
                  >
                    <div className="respuesta-card-title">
                      <h3>{respuesta.texto}</h3>
                    </div>
                    <div className="respuesta-card-content">
                      <img src={respuesta.icono} />
                    </div>
                  </IonCard>
                );
              })}
            </div>
          </div>

          {overlayTiempoAgotado && (
            <div className="defeat-overlay">
              <div className="defeat-message">
                <h2 style={{fontWeight: 'bold'}}>¡Tiempo agotado! ⏰</h2>
                <p>No lograste responder el acertijo a tiempo.</p>
                <p>Pasando al siguiente acertijo...</p>
              </div>
            </div>
          )}

          {overlayFinJuego.abierto && (
            <div className="victory-overlay">
              <div className="victory-message">
                <h2 style={{fontWeight: 'bold'}}>¡Muy bien! 🎉</h2>
                <p>Has respondido correctamente el acertijo.</p>
                <p>
                  <strong>
                    Has ganado +{overlayFinJuego.puntosObtenidos} puntos
                  </strong>
                </p>
                <p>Preparando el siguiente acertijo...</p>
              </div>

              <div className="confetti-container">
                {generarConfeti().map((particula) => (
                  <div
                    key={particula.id}
                    className="confetti"
                    style={{
                      backgroundColor: particula.color,
                      left: `${particula.left}%`,
                      animationDelay: `${particula.delay}s`,
                      animationDuration: `${particula.duration}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {overlayResumenFinal && (
            <div className="summary-overlay">
              <div className="summary-message">
                <h2 style={{fontWeight: 'bold'}}>Juego terminado</h2>
                <div className="resumen-final">
                  <h3>Resultados finales</h3>
                  <p>
                    <strong>Acertijos correctos:</strong>
                  </p>
                  <p>
                    {juegosCompletados} de {totalJuegos}
                  </p>
                  <p>
                    <strong>Acertijos sin resolverz:</strong>
                  </p>
                  <p>{juegosFallados}</p>
                  <p>
                    <strong>Puntuación total:</strong>
                  </p>
                  <p>{puntuacionTotal} puntos</p>
                  <IonBadge color="primary">
                    {juegosCompletados === totalJuegos
                      ? "¡PERFECTO! 🏆"
                      : juegosCompletados > juegosFallados
                      ? "¡Buen trabajo! 👍"
                      : "¡Sigue intentando! 💪"}
                  </IonBadge>
                </div>
                <IonButton
                  expand="block"
                  shape="round"
                  onClick={reiniciarJuego}
                  color="light"
                  style={{ marginTop: "20px" }}
                >
                  <IonIcon slot="start" icon={refresh} />
                  Reiniciar juego
                </IonButton>
              </div>

              <div className="confetti-container">
                {generarConfeti().map((particula) => (
                  <div
                    key={particula.id}
                    className="confetti"
                    style={{
                      backgroundColor: particula.color,
                      left: `${particula.left}%`,
                      animationDelay: `${particula.delay}s`,
                      animationDuration: `${particula.duration}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {showInstructions && (
            <div className="ins-overlay">
              <div className="ins-card">
                <div className="ins-title">
                  <h2 style={{ margin: 0, fontWeight: "bold" }}>
                    Instrucciones
                  </h2>
                  <IonIcon
                    icon={closeCircleOutline}
                    style={{ fontSize: "26px" }}
                    onClick={() => setShowInstructions(false)}
                  />
                </div>

                <div className="ins-stats">
                  <p style={{ textAlign: "justify" }}>
                    <strong>
                      Lee con atención el acertijo y pulsa sobre la tarjeta que
                      consideres correcta. Tienes un tiempo limitado para
                      elegir. Si aciertas, ganarás puntos y pasarás al siguiente
                      acertijo. Si el tiempo se agota, se contará como no
                      resuelto.
                    </strong>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Acertijos;
