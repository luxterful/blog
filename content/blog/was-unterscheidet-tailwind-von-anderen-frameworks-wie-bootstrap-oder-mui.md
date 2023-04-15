---
title: Was unterscheidet Tailwind von anderen Frameworks wie Bootstrap oder MUI
date: 2023-04-14
tags:   
- tailwind
- vue
- mui
external: true  
canonical: https://blog.mayflower.de/asdfasdfasfdasdf
---  
 
Front-End-CSS-Frameworks sind heute unverzichtbar für die Entwicklung moderner Webanwendungen. Sie helfen Entwicklern, ansprechende Designs zu erstellen. Drei der beliebtesten Frameworks sind Tailwind, Bootstrap und MUI. 

Bootstrap, ursprünglich als "Twitter Bootstrap" bekannt, ist ein weit verbreitetes CSS Framework, das von Twitter entwickelt wurde. Es wurde erstmals 2011 veröffentlicht und ist somit das Älteste der drei Frameworks. 

MUI (Material-UI) basiert auf der von Google entwickelten Material Design-Sprache, die ein flaches, minimalistisches Design, kräftige Farben und einfache Typografie betont.

Tailwind hat sich nach anfänglicher Skepsis von vielen Entwicklern in ein mittlerweile sehr beliebtes Framework entwickelt. Im Gegensatz zu Bootstrap und MUI hat Tailwind keine spezifische Designsprache. Es besitzt auch keine Klassen, die vordefinierte Komponenten beschreiben. Stattdessen bietet Tailwind eine Reihe von sogenannten "Utility-Klassen".

## Bootstrap 

Bootstrap ist bekannt für sein sauberes Erscheinungsbild, das auf einer Kombination von Gestaltungsprinzipien, vorgefertigten UI-Komponenten und einem responsiven Grid-System basiert. Aufgrund der weiten Verbreitung und der Verwendung von vorgefertigten Komponenten können Bootstrap-Websites ähnlich aussehen und wenig Raum für individuelle Designs bieten.

Das nachfolgende Beispiel beschreibt eine Card-Komponente mit Bootstrap:
 
``` html
<div class="container mt-5">
  <div class="row">
    <div class="col-md-6">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Titel</h5>
          <p class="card-text">Text</p>
          <a href="#" class="btn btn-primary">Button</a>
        </div>
      </div>
    </div>
  </div>
</div>
```

Wie im Code-Beispiel erkennbar, benennen Bootstrap-CSS-Klassen das Styling oder den Namen der Komponente auf eine leicht verständliche Art und Weise. Das Anpassen von Bootstrap-Komponenten kann allerdings komplex werden, insbesondere wenn Entwickler versuchen, das zugrunde liegende Erscheinungsbild des Frameworks zu ändern. Das kann zusätzlichen Aufwand bedeuten, um das gewünschte Design zu erreichen und die vorgegebenen Stile zu überschreiben.

Bootstrap ist als eigenständiges CSS-Framework konzipiert. Es ist auf JavaScript angewiesen um komplexere Interaktionen zu ermöglichen. Für einfache Animationen wie z.B. das ein- und ausklappen einer Navbar kann jQuery und die dazugehörigen Bootstrap Plugins verwendet werden. Für aufwändige Anwendungen kommt beispielsweise React-Bootstrap zum Einsatz. Es kann den Entwicklungsprozess beschleunigen, indem es bereits mit Bootstrap gestylete React-Komponenten zur Verfügung stellt.

## MUI
Neben den CSS-Klassen enthält dieses Framework auch bereits die Implementierung von React-Komponenten. Diese Komponenten besitzen Schnittstellen, die sogenannten Props. Mit Hilfe dieser Schnittstellen können verschiedene Varianten der Komponente erzeugt werden. Im Beispiel weiter unten werden z.B. mit `spacing={2}` die Abstände definiert oder mit `color="primary"` die Farbe des Buttons festgelegt.

Um den Komponenten eigene Styles zu geben, die nicht den Standard MUI Styles entsprechen, muss mit zusätzlichen CSS Style Properties gearbeitet werden. Hier wird mit dem Property `sx` gearbeitet.

Das nachfolgende Code-Snippet ist das Pendant zum Card-Beispiel von vorhin:

``` javascript
import { Container, Grid, Card, CardContent, Typography, Button } from '@mui/material';

function Example() {
  return (
    <Container sx={{ marginTop: 5 }}>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">Titel</Typography>
              <Typography variant="body1" component="p">Text</Typography>
              <Button variant="contained" color="primary">Button</Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
```

## Tailwind 

Wie bereits erwähnt setzt Tailwind auf "Utility-Klassen". Diese umfassen spezifische "CSS-Eigenschaften" wie z.B. Abstände, Größen, Farben und Ausrichtungen. Man könnte sagen, Tailwind fügt zu normalem CSS eine weitere Abstraktionsebene hinzu, indem jedem CSS Property eine CSS Klasse gewidmet wird. Aus diesem Grund könnte man Tailwind auch eher in die Kategorie der Frontend-Tools (wie z.B. SASS) einordnen und weniger als "klassisches" Frontend-Framework.

Utility-Klassen in Tailwind haben in der Regel kurze und prägnante Namen, die auf ihre Funktion hinweisen, wie z.B. `bg-red-500` für eine rote Hintergrundfarbe. Mit diesem Ansatz wird auch rein durch die Betrachtung der HTML Tags ersichtlich, welche Style Properties angewendet werden. Dadurch wird das Styling transparenter und nachvollziehbarer. Dieser Ansatz gibt Entwicklern mehr Kontrolle über das endgültige Erscheinungsbild ihrer Anwendung, erfordert aber grundlegendes Verständnis über CSS selbst.

Neben der Abstraktion von CSS Properties werden auch Größen und Abstände in ein einheitliches Verhältnis gebracht. Es ist nicht notwendig direkt mit Pixel oder rem zu arbeiten. Tailwind generiert für alle Abstände und Größen eine nummerische Skala. Beispielsweise bei Padding und Margin geht diese Skala von 0 bis 96. Diese gehen von 0px bis zu 24rem.

Neben der nummerischen Skala bietet Tailwind auch eine Skala an, die sich an T-Shirt Größen orientiert. Diese werden z.B. für responsive design mit Breakpoints oder Textgrößen verwendet. Die Größen starten zum Beispiel bei 2xs und enden bei 3xl.

Das nachfolgende Code Snippet ist ebenfalls das Pendant zum Card-Beispiel:

``` html
<div class="max-w-md mx-auto">
  <div class="bg-white rounded-lg mt-5 overflow-hidden border">
    <div class="p-4">
      <h3 class="font-bold text-xl mb-2">Titel</h3>
      <p class="text-gray-700 text-base">Text</p>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Button</button>
    </div>
  </div>
</div>
```

## Fazit

Diese Ansätze von Bootstrap und MUI eignen sich gut für schnelle Entwicklungen und können ideal für Teams ohne eigene Designer sein. Andererseits können sie aber schnell dazu führen, dass sich das Erscheinungsbild der entwickelten Anwendung in den Einheitsbrei der Frameworks einreiht. 

Tailwind hingegen bietet durch seinen Utility-First-Ansatz eine höhere Flexibilität und Kontrolle über das Design, was Entwicklern ermöglicht, individuellere und einzigartige Designs zu erstellen. Allerdings erfordert dieser Ansatz ein fundiertes Verständnis von CSS und möglicherweise zusätzlichen Gestaltungsaufwand.

Die Wahl des geeigneten Front-End-Frameworks oder -Tools hängt letztendlich von den spezifischen Anforderungen, Präferenzen des Entwicklerteams und den Designzielen des Projekts ab. 
