import React, { useEffect, useState } from "react";
import {
  alertCircleOutline,
  time,
  closeCircleOutline,
  refresh,
  playCircleOutline,
  informationCircleOutline,
  pauseCircleOutline,
  homeOutline,
  exitOutline,
} from "ionicons/icons";
import { Capacitor } from "@capacitor/core";
import { App as CapacitorApp } from "@capacitor/app";
import "./Acertijos.css";
import {
  IonCard,
  IonContent,
  IonIcon,
  IonPage,
  IonPopover,
  IonTitle,
  IonButton,
  IonBadge,
  IonChip,
} from "@ionic/react";

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

type AcertijoJSON = {
  id: string;
  tema: string;
  pregunta: string;
  respuesta: string;
  opciones: string[];
};

type AcertijosRuntimeConfig = {
  autor?: string;
  version?: string;
  fecha?: string;
  descripcion?: string;
  nombreApp?: string;
  plataformas?: string[];
  nivel?: string;
  tiempoLimite?: number;
  categoria?: string;
  acertijos?: AcertijoJSON[];
  problematicas?: ProblematicaFlujoId[];
};

const categoriaDesdeId = (id: ProblematicaFlujoId): string => {
  if (id.includes("_bio_")) return "Biología";
  if (id.includes("_mat_")) return "Matemáticas";
  if (id.includes("_org_")) return "Órganos";
  if (id.includes("_vac_")) return "Vacunas";
  if (id.includes("_geo3d_")) return "Geometría 3D";
  if (id.includes("_geo_")) return "Geometría";
  return "General";
};

const shuffleArray = <T,>(arr: T[]): T[] => {
  // Crea una copia para no modificar el arreglo original del escenario
  const copy = [...arr];

  // Fisher-Yates: garantiza una permutación uniforme
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
};

const transformarAcertijosJSON = (acertijosJSON: AcertijoJSON[]): EscenarioFlujo[] => {
  return acertijosJSON.map((acertijo) => {
    // Convertir las opciones en RespuestaOpcion[]
    const respuestas: RespuestaOpcion[] = acertijo.opciones.map((opcion) => ({
      texto: opcion,
      esCorrecta: opcion === acertijo.respuesta,
      icono: "/icons/"
    }));

    return {
      id: acertijo.id as ProblematicaFlujoId,
      titulo: acertijo.tema,
      acertijo: acertijo.pregunta,
      respuestas
    };
  });
};

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

  const normalizarNivelConfig = (n: string): NivelId => {
    const mapa: Record<string, NivelId> = {
      basico: "basico",
      basic: "basico",
      intermedio: "intermedio",
      intermediate: "intermedio",
      avanzado: "avanzado",
      advanced: "avanzado",
    };
    return mapa[n] || "basico";
  };

  const obtenerNombreNivel = (nivelKey: NivelId) => {
    const nombres: Record<NivelId, string> = {
      basico: "Básico",
      intermedio: "Intermedio",
      avanzado: "Avanzado",
    };
    return nombres[nivelKey] || nivelKey;
  };

  const [appName, setAppName] = useState("STEAM-G");
  const [appAutor, setAppAutor] = useState("STEAM-G");
  const [appVersion, setAppVersion] = useState("1.0.0");
  const [appFecha, setAppFecha] = useState("16 de Noviembre del 2025");
  const [appPlataformas, setAppPlataformas] = useState("Android, iOS y Web");
  const [appDescripcion, setAppDescripcion] = useState(
    "Lee el acertijo y selecciona la respuesta correcta antes de que termine el tiempo."
  );
  const [configNivel, setConfigNivel] = useState<string | null>(null);
  const [configProblematicas, setConfigProblematicas] = useState<
    ProblematicaFlujoId[] | null
  >(null);
  const [configAcertijos, setConfigAcertijos] = useState<EscenarioFlujo[] | null>(null);
  const [configTiempoLimite, setConfigTiempoLimite] = useState<number | null>(null);
  const [configCategoria, setConfigCategoria] = useState<string | null>(null);

  // Pantalla de inicio + modal de información (estilo Play)
  const [mostrarPantallaInicio, setMostrarPantallaInicio] = useState(true);
  const [showInformation, setShowInformation] = useState(false);

  // Overlay de cuenta regresiva (3..2..1..¡Ahora!)
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdown, setCountdown] = useState(3);

  // Pausa (modal tipo Play)
  const [pausado, setPausado] = useState(false);
  const [showPauseAlert, setShowPauseAlert] = useState(false);

  // Instrucciones
  const [showInstructions, setShowInstructions] = useState<boolean>(false);

  const [indiceJuegoActual, setIndiceJuegoActual] = useState(0);

  // Usa el nivel del JSON config si está disponible, si no usa el prop
  const nivelAUsar = configNivel !== null ? configNivel : nivel;
  const nivelConfigKey = normalizarNivelConfig(nivelAUsar);
  const config = configuracionNiveles[nivelConfigKey];

  const [tiempoRestante, setTiempoRestante] = useState(() => {
    return config.tiempoPorJuego * 60;
  });
  const [puntuacionTotal, setPuntuacionTotal] = useState(0);
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [juegosCompletados, setJuegosCompletados] = useState(0);
  const [juegosFallados, setJuegosFallados] = useState(0);

  const [juegoActualCompletado, setJuegoActualCompletado] = useState(false);

  const [overlayFinJuego, setOverlayFinJuego] = useState<{
    abierto: boolean;
    puntosObtenidos: number;
    esCorrecta: boolean;
  }>({
    abierto: false,
    puntosObtenidos: 0,
    esCorrecta: true,
  });

  const [overlayTiempoAgotado, setOverlayTiempoAgotado] =
    useState<boolean>(false);

  const [overlayResumenFinal, setOverlayResumenFinal] =
    useState<boolean>(false);

  const [configLoaded, setConfigLoaded] = useState(false);

  useEffect(() => {
    const cargarConfig = async () => {
      try {
        // Ajusta el nombre del archivo si el tuyo se llama diferente
        const res = await fetch("/config/acertijos-config.json");

        if (!res.ok) {
          setConfigLoaded(true);
          return;
        }

        const data: AcertijosRuntimeConfig = await res.json();

        if (data.nombreApp) setAppName(data.nombreApp);
        if (data.autor) setAppAutor(data.autor);
        if (data.version) setAppVersion(data.version);
        if (data.fecha) setAppFecha(formatearFechaLarga(data.fecha));
        if (data.descripcion) setAppDescripcion(data.descripcion);
        if (data.plataformas) setAppPlataformas(data.plataformas.join(", "));
        if (data.nivel) setConfigNivel(data.nivel);
        if (data.problematicas) setConfigProblematicas(data.problematicas);

        // Nuevos campos del JSON
        if (data.tiempoLimite) setConfigTiempoLimite(data.tiempoLimite);
        if (data.categoria) setConfigCategoria(data.categoria);
        if (data.acertijos && data.acertijos.length > 0) {
          const acertijosTransformados = transformarAcertijosJSON(data.acertijos);
          setConfigAcertijos(acertijosTransformados);
        }
      } catch (err) {
        console.error("No se pudo cargar acertijos-config.json", err);
      } finally {
        setConfigLoaded(true);
      }
    };

    cargarConfig();
  }, []);

  // Actualiza el tiempo inicial cuando se carga el tiempo límite del JSON (viene en segundos)
  useEffect(() => {
    if (configTiempoLimite !== null && mostrarPantallaInicio) {
      setTiempoRestante(configTiempoLimite);
    }
  }, [configTiempoLimite, mostrarPantallaInicio]);

  const escenariosNivelBase = diccionarioFlujo[nivelConfigKey];

  // Prioridad: 1) acertijos del JSON, 2) problemáticas del JSON, 3) prop problematicas, 4) por defecto del nivel
  const escenariosSeleccionados: EscenarioFlujo[] = (() => {
    // Si hay acertijos del JSON, usarlos
    if (configAcertijos && configAcertijos.length > 0) {
      return configAcertijos;
    }

    // Si hay problemáticas configuradas (del JSON o del prop)
    const problematicasAUsar = configProblematicas !== null ? configProblematicas : problematicas;
    if (problematicasAUsar && problematicasAUsar.length > 0) {
      return problematicasAUsar
        .map((id) => escenariosNivelBase.find((escenario) => escenario.id === id))
        .filter((escenario): escenario is EscenarioFlujo => !!escenario);
    }

    // Por defecto, usar los primeros del nivel
    return escenariosNivelBase.slice(0, configuracionNiveles[nivelConfigKey].numeroJuegos);
  })();

  const totalJuegos = escenariosSeleccionados.length || 1;

  const escenarioActual: EscenarioFlujo =
    escenariosSeleccionados[indiceJuegoActual] ||
    escenariosSeleccionados[0] ||
    escenariosNivelBase[0];

  const formatearFechaLarga = (isoDate?: string) => {
    if (!isoDate) return appFecha;

    const [year, month, day] = isoDate.split("-");
    const meses = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];

    const mesIndex = Number(month) - 1;
    if (mesIndex < 0 || mesIndex > 11) return isoDate;

    return `${Number(day)} de ${meses[mesIndex]} del ${year}`;
  };

  // Categoría: usa la del JSON si está disponible, si no la infiere de los IDs
  const categoriaConfig = (() => {
    // Si el JSON tiene categoría configurada, usarla
    if (configCategoria !== null) {
      return configCategoria;
    }

    // Si no, inferirla de los IDs de los escenarios seleccionados
    const categorias = new Set(
      (escenariosSeleccionados.length
        ? escenariosSeleccionados
        : [escenarioActual]
      ).map((e) => categoriaDesdeId(e.id))
    );
    if (categorias.size === 1) return Array.from(categorias)[0];
    return "Mixta";
  })();

  const [respuestasOrdenadas, setRespuestasOrdenadas] = useState<
    RespuestaOpcion[]
  >([]);

  const [respuestaSeleccionada, setRespuestaSeleccionada] =
    useState<RespuestaOpcion | null>(null);

  const [ultimaRespuestaCorrecta, setUltimaRespuestaCorrecta] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    setJuegoActualCompletado(false);
    setRespuestaSeleccionada(null);
    setUltimaRespuestaCorrecta(null);

    // Cada que cambia el escenario (nuevo juego), aleatorizamos el orden de las respuestas
    setRespuestasOrdenadas(shuffleArray(escenarioActual.respuestas));
  }, [indiceJuegoActual, escenarioActual.id]);

  const handleRespuestaSeleccionada = (respuesta: RespuestaOpcion) => {
    // Bloquea selección si el juego ya terminó o si hay overlays activos
    if (juegoTerminado || overlayFinJuego.abierto || overlayTiempoAgotado) {
      return;
    }

    // Guarda selección para pintar la tarjeta (verde/rojo)
    setRespuestaSeleccionada(respuesta);
    setUltimaRespuestaCorrecta(respuesta.esCorrecta);

    if (respuesta.esCorrecta) {
      // ✅ Correcta: suma puntos y cuenta como completada
      const puntosObtenidos = config.puntosPorJuego;
      setPuntuacionTotal((prev) => prev + puntosObtenidos);
      setJuegosCompletados((prev) => prev + 1);
      setJuegoActualCompletado(true);

      // Abre overlay (el useEffect lo cerrará y avanzará)
      setOverlayFinJuego({
        abierto: true,
        puntosObtenidos,
        esCorrecta: true,
      });
    } else {
      // ❌ Incorrecta: NO suma puntos y pasa al siguiente juego
      setJuegosFallados((prev) => prev + 1);
      setJuegoActualCompletado(true);

      // Abre overlay con 0 puntos (el cierre automático avanzará)
      setOverlayFinJuego({
        abierto: true,
        puntosObtenidos: 0,
        esCorrecta: false,
      });
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
    // Usa tiempo del JSON (en segundos) si está disponible, si no el del config (en minutos)
    const tiempoPorJuego = configTiempoLimite !== null ? configTiempoLimite : config.tiempoPorJuego * 60;
    setTiempoRestante(tiempoPorJuego);
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

  // -------------------------
  // Timer (se detiene en overlays, pausa y cuenta regresiva)
  // -------------------------
  useEffect(() => {
    if (
      mostrarPantallaInicio ||
      showCountdown ||
      pausado ||
      showPauseAlert ||
      overlayResumenFinal ||
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
    mostrarPantallaInicio,
    showCountdown,
    pausado,
    showPauseAlert,
    overlayResumenFinal,
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

  // -------------------------
  // Cuenta regresiva 3..2..1..¡Ahora!
  // -------------------------
  useEffect(() => {
    if (!showCountdown) return;

    setCountdown(3);

    const intervalId = window.setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          window.clearInterval(intervalId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [showCountdown]);

  useEffect(() => {
    if (!showCountdown) return;

    if (countdown === 0) {
      const t = window.setTimeout(() => {
        setShowCountdown(false);
        setCountdown(3);
      }, 700);

      return () => window.clearTimeout(t);
    }
  }, [countdown, showCountdown]);

  const formatearTiempo = (segundos: number) => {
    const minutos = Math.floor(segundos / 60);
    const segs = segundos % 60;
    return `${minutos}:${segs.toString().padStart(2, "0")}`;
  };

  const reiniciarJuego = () => {
    setJuegoTerminado(false);

    setOverlayResumenFinal(false);
    setOverlayTiempoAgotado(false);
    setOverlayFinJuego({
      abierto: false,
      puntosObtenidos: 0,
      esCorrecta: true,
    });

    setIndiceJuegoActual(0);

    // Usa tiempo del JSON (en segundos) si está disponible, si no el del config (en minutos)
    const tiempoPorJuego = configTiempoLimite !== null ? configTiempoLimite : config.tiempoPorJuego * 60;
    setTiempoRestante(tiempoPorJuego);
    setPuntuacionTotal(0);
    setJuegosCompletados(0);
    setJuegosFallados(0);

    setJuegoActualCompletado(false);
    setRespuestaSeleccionada(null);
    setUltimaRespuestaCorrecta(null);

    // Al reiniciar, también aleatorizamos las respuestas del primer acertijo
    setRespuestasOrdenadas(
      shuffleArray((escenariosSeleccionados[0] || escenarioActual).respuestas)
    );

    setShowInstructions(false);
  };

  const handleIniciarJuego = () => {
    reiniciarJuego();
    setMostrarPantallaInicio(false);
    setShowCountdown(true);
  };

  const handleInformation = () => {
    setShowInformation((prev) => !prev);
  };

  const handleExitToStart = () => {
    setShowPauseAlert(false);
    setPausado(false);

    setShowCountdown(false);
    setShowInstructions(false);
    setOverlayFinJuego({
      abierto: false,
      puntosObtenidos: 0,
      esCorrecta: true,
    });
    setOverlayTiempoAgotado(false);
    setOverlayResumenFinal(false);

    setJuegoTerminado(true);
    setMostrarPantallaInicio(true);
  };

  const handleCerrarAplicacion = () => {
    if (Capacitor.isNativePlatform()) {
      CapacitorApp.exitApp();
      return;
    }

    if (typeof window !== "undefined" && window.close) {
      window.close();
    }
  };

  const handlePausar = () => {
    if (
      mostrarPantallaInicio ||
      showCountdown ||
      overlayResumenFinal ||
      overlayFinJuego.abierto ||
      overlayTiempoAgotado ||
      juegoTerminado ||
      pausado
    ) {
      return;
    }

    setPausado(true);
    setShowPauseAlert(true);
  };

  const handleReanudar = () => {
    setCountdown(3);
    setShowCountdown(true);
    setShowPauseAlert(false);
    setPausado(false);
  };

  const handleSalirDesdePausa = () => {
    setShowPauseAlert(false);
    setPausado(false);
    reiniciarJuego();
    setMostrarPantallaInicio(true);
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
      {showCountdown && (
        <div className="countdown-overlay">
          <div className="countdown-number">
            {countdown > 0 ? countdown : "¡Ahora!"}
          </div>
        </div>
      )}

      {showPauseAlert && (
        <div className="pause-overlay" onClick={() => {}}>
          <div className="pause-card" onClick={(e) => e.stopPropagation()}>
            <h2>Juego en pausa</h2>
            <p>El tiempo se ha detenido.</p>

            <IonButton
              expand="block"
              id="resume"
              style={{ marginTop: "18px" }}
              onClick={handleReanudar}
            >
              <IonIcon slot="start" icon={playCircleOutline}></IonIcon>
              Reanudar
            </IonButton>

            <IonButton
              expand="block"
              id="finalize"
              style={{ marginTop: "10px" }}
              onClick={handleSalirDesdePausa}
            >
              <IonIcon slot="start" icon={homeOutline}></IonIcon>
              Finalizar juego
            </IonButton>

            <IonButton
              expand="block"
              id="exit"
              style={{ marginTop: "10px" }}
              onClick={handleCerrarAplicacion}
            >
              <IonIcon slot="start" icon={exitOutline}></IonIcon>
              Cerrar aplicación
            </IonButton>
          </div>
        </div>
      )}

      {showInformation && (
        <div className="info-modal-background" onClick={handleInformation}>
          <div className="info-modal" onClick={(e) => e.stopPropagation()}>
            <div className="header">
              <h2 style={{ color: "var(--color-primary)", fontWeight: "bold" }}>
                {appName}
              </h2>
              <p
                style={{
                  color: "#8b8b8bff",
                  marginTop: "5px",
                  textAlign: "center",
                }}
              >
                Actividad configurada desde la plataforma Steam-G
              </p>
            </div>

            <div className="cards-info">
              <div className="card">
                <p className="title">VERSIÓN</p>
                <p className="data">{appVersion}</p>
              </div>

              <div className="card">
                <p className="title">FECHA DE CREACIÓN</p>
                <p className="data">{appFecha}</p>
              </div>

              <div className="card">
                <p className="title">PLATAFORMAS</p>
                <p className="data">{appPlataformas}</p>
              </div>

              <div className="card">
                <p className="title">NIVEL</p>
                <p className="data">{obtenerNombreNivel(nivelConfigKey)}</p>
              </div>

              <div className="card">
                <p className="title">CATEGORÍA</p>
                <p className="data">{categoriaConfig}</p>
              </div>

              <div className="card description">
                <p className="title">DESCRIPCIÓN</p>
                <p className="data">{appDescripcion}</p>
              </div>
            </div>

            <div className="button">
              <IonButton expand="block" onClick={handleInformation}>
                Cerrar
              </IonButton>
            </div>
          </div>
        </div>
      )}

      <IonContent fullscreen className="ion-padding">
        {mostrarPantallaInicio ? (
          <div className="inicio-container">
            <div className="header-game ion-no-border">
              <div className="toolbar-game">
                <div className="titles start-page">
                  <h1>{appName}</h1>
                </div>
              </div>
            </div>

            <div className="info-juego">
              <div className="info-item">
                <IonChip>
                  <strong>Nivel: {obtenerNombreNivel(nivelConfigKey)}</strong>
                </IonChip>
              </div>

              {/* <div className="info-item">
                <IonChip>
                  <strong>Categoría: {categoriaConfig}</strong>
                </IonChip>
              </div> */}
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
              className="page-start-btns"
            >
              <IonButton onClick={handleIniciarJuego} className="play">
                <IonIcon slot="start" icon={playCircleOutline}></IonIcon>
                Iniciar juego
              </IonButton>

              <IonButton onClick={handleInformation} className="info">
                <IonIcon slot="start" icon={informationCircleOutline}></IonIcon>
                Información
              </IonButton>
            </div>
          </div>
        ) : (
          <>
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

                <div
                  className={
                    "temporizador " +
                    (tiempoRestante <= 10 ? "tiempo-critico" : "")
                  }
                >
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
                  {(respuestasOrdenadas.length
                    ? respuestasOrdenadas
                    : escenarioActual.respuestas
                  ).map((respuesta, index) => {
                    const esSeleccionada = respuestaSeleccionada === respuesta;

                    const clasesAdicionales =
                      esSeleccionada && ultimaRespuestaCorrecta === true
                        ? " respuesta-card-correcta"
                        : esSeleccionada && ultimaRespuestaCorrecta === false
                        ? " respuesta-card-incorrecta"
                        : "";

                    return (
                      <IonCard
                        key={`${escenarioActual.id}-${respuesta.texto}-${index}`}
                        className={
                          "respuesta-card respuesta-card-entrada" +
                          clasesAdicionales
                        }
                        button
                        onClick={() => handleRespuestaSeleccionada(respuesta)}
                      >
                        <div className="respuesta-card-title">
                          <h3>{respuesta.texto}</h3>
                        </div>
                        <div className="respuesta-card-content">
                          <img src={respuesta.icono} alt={respuesta.texto} />
                        </div>
                      </IonCard>
                    );
                  })}
                </div>
              </div>

              <div className="button">
                <IonButton
                  expand="full"
                  shape="round"
                  onClick={handlePausar}
                  disabled={
                    pausado ||
                    showCountdown ||
                    overlayFinJuego.abierto ||
                    overlayTiempoAgotado ||
                    overlayResumenFinal
                  }
                >
                  <IonIcon slot="start" icon={pauseCircleOutline} />
                  Pausar
                </IonButton>
              </div>

              {overlayTiempoAgotado && (
                <div className="defeat-overlay">
                  <div className="defeat-message">
                    <h2 style={{ fontWeight: "bold" }}>¡Tiempo agotado! ⏰</h2>
                    <p>No lograste responder el acertijo a tiempo.</p>
                    <p>Pasando al siguiente acertijo...</p>
                  </div>
                </div>
              )}

              {overlayFinJuego.abierto && (
                <div
                  className={
                    overlayFinJuego.esCorrecta
                      ? "victory-overlay"
                      : "defeat-overlay"
                  }
                >
                  <div
                    className={
                      overlayFinJuego.esCorrecta
                        ? "victory-message"
                        : "defeat-message"
                    }
                  >
                    <h2 style={{ fontWeight: "bold" }}>
                      {overlayFinJuego.esCorrecta
                        ? "¡Muy bien! 🎉"
                        : "¡Ups! ❌"}
                    </h2>

                    <p>
                      {overlayFinJuego.esCorrecta
                        ? "Has respondido correctamente el acertijo."
                        : "La respuesta fue incorrecta."}
                    </p>

                    <p>
                      <strong>
                        Has ganado +
                        {overlayFinJuego.esCorrecta
                          ? overlayFinJuego.puntosObtenidos
                          : 0}{" "}
                        puntos
                      </strong>
                    </p>

                    <p>Preparando el siguiente acertijo...</p>
                  </div>

                  {overlayFinJuego.esCorrecta && (
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
                  )}
                </div>
              )}

              {overlayResumenFinal && (
                <div className="summary-overlay">
                  <div className="summary-message">
                    <h2 style={{ fontWeight: "bold" }}>Juego terminado</h2>

                    <div className="resumen-final">
                      <h3>Resultados finales</h3>

                      <p>
                        <strong>Acertijos correctos:</strong>
                      </p>
                      <p>
                        {juegosCompletados} de {totalJuegos}
                      </p>

                      <p>
                        <strong>Acertijos sin resolver:</strong>
                      </p>
                      <p>{juegosFallados}</p>

                      <p>
                        <strong>Puntuación total:</strong>
                      </p>
                      <p>{puntuacionTotal} puntos</p>

                      <IonBadge className="badge">
                        {juegosCompletados === totalJuegos
                          ? "¡PERFECTO! 🏆"
                          : juegosCompletados > juegosFallados
                          ? "¡Buen trabajo! 👍"
                          : "¡Sigue intentando! 💪"}
                      </IonBadge>
                    </div>

                    <IonButton
                      id="finalize"
                      expand="block"
                      onClick={handleExitToStart}
                    >
                      <IonIcon icon={refresh} slot="start" />
                      Jugar de Nuevo
                    </IonButton>

                    <IonButton
                      id="exit"
                      expand="block"
                      onClick={handleCerrarAplicacion}
                    >
                      <IonIcon slot="start" icon={exitOutline}></IonIcon>
                      Cerrar aplicación
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
                <div
                  className="ins-overlay"
                  onClick={() => setShowInstructions(false)}
                >
                  <div
                    className="ins-card"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="ins-title">
                      <h2
                        style={{
                          margin: 0,
                          fontWeight: "bold",
                          color: "var(--color-primary)",
                        }}
                      >
                        Instrucciones
                      </h2>
                      <IonIcon
                        icon={closeCircleOutline}
                        style={{
                          fontSize: "26px",
                          color: "var(--color-primary)",
                        }}
                        onClick={() => setShowInstructions(false)}
                      />
                    </div>

                    <div className="ins-stats">
                      <p style={{ textAlign: "justify" }}>
                        <strong>
                          Lee con atención el acertijo y pulsa sobre la tarjeta
                          que consideres correcta. Tienes un tiempo limitado
                          para elegir. Si aciertas, ganarás puntos y pasarás al
                          siguiente acertijo. Si el tiempo se agota, se contará
                          como no resuelto.
                        </strong>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Acertijos;
