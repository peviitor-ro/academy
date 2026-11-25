---
title: 'Cum rulezi Academia peViitor local'
description: 'Pașii pentru a porni proiectul pe calculatorul tău, de la clonare până la primul build.'
domain: 'general'
level: 'beginner'
series: 'Start în Academie'
order: 1
durationMin: 10
author: 'Echipa Academia peViitor'
updated: 2026-11-22
---

Acest tutorial îți arată cum pornești site-ul Academiei pe calculatorul tău, ca să poți face modificări și să le vezi imediat.

## Ce îți trebuie

- [Node.js](https://nodejs.org) versiunea 22.12 sau mai nouă
- [Git](https://git-scm.com)
- Un editor de cod, de exemplu VS Code

> [!NOTE]
> - **Node.js** rulează JavaScript în afara browserului.
> - **npm** instalează dependențele proiectului.
> - **Astro** construiește site-ul static.

## Pașii

Clonează repository-ul și intră în folder:

```bash
git clone https://github.com/peviitor-ro/academy.git
cd academy
```

Instalează dependențele și pornește serverul de dezvoltare:

```bash
npm install
npm run dev
```

Deschide în browser adresa afișată în terminal, de obicei `http://localhost:4321`.

## Verifică build-ul

Înainte să trimiți o modificare, rulează build-ul de producție:

```bash
npm run build
```

Dacă se termină fără erori, ești gata de un Pull Request. Următoarea lecție explică cum îl deschizi.

> [!TIP]
> Dacă `npm install` eșuează, verifică întâi versiunea de Node cu `node -v`. Trebuie să fie 22.12 sau mai nouă.
