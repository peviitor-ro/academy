---
title: 'Primul tău Pull Request'
description: 'Cum faci un fork, o modificare și un Pull Request către repository-ul Academiei.'
domain: 'general'
level: 'beginner'
series: 'Start în Academie'
order: 2
durationMin: 15
author: 'Echipa Academia peViitor'
updated: 2026-11-22
---

Un Pull Request (PR) este felul în care propui o modificare într-un proiect open-source. Mai jos e fluxul complet, de la zero.

## 1. Fork și clonare

1. Apasă **Fork** în pagina repository-ului de pe GitHub.
2. Clonează fork-ul tău, nu repository-ul original:

```bash
git clone https://github.com/<utilizatorul-tau>/academy.git
cd academy
```

## 2. Creează un branch

Lucrează mereu pe un branch separat, cu un nume care descrie modificarea:

```bash
git checkout -b feat/componenta-button
```

## 3. Fă modificarea și verific-o

Rulează `npm run build` înainte de commit, ca să te asiguri că proiectul se construiește.

## 4. Commit și push

```bash
git add .
git commit -m "feat: adaugă componenta Button"
git push origin feat/componenta-button
```

## 5. Deschide Pull Request-ul

În GitHub apare butonul **Compare & pull request**. Descrie pe scurt ce ai schimbat și, dacă e o modificare vizuală, atașează un screenshot. Un coleg o să o revizuiască și o să îți lase comentarii.
