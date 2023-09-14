---
title: Hilfe meine Festplatte ist voll. Könnte es an Docker liegen?
date: 2023-09-14
tags:   
- docker
external: false  
---  

Ich bekomme seit ein paar Tagen immer wieder in docker `no space left on device`.

Ich hatte das auch früher immer wieder mal aber habs mit `docker system prune` lösen können.
Das ist aber bisher immer nur die halbe Miete gewesen wie ich gerade rausgefunden habe :D 

``` bash
❯ docker system df

TYPE            TOTAL     ACTIVE    SIZE      RECLAIMABLE
Images          5         2         3.509GB   2.815GB (80%)
Containers      2         2         30.72MB   0B (0%)
Local Volumes   153       1         41.76GB   41.76GB (99%)
Build Cache     27        0         0B        0B
```

Mit `docker system df` kann man sich den speicherverbrauch anschauen. Warum auch immer werden local volumes nicht gelöscht wenn man ein system prune durchführt... die haben bei mir einfach mal fast 42GB 

``` bash
❯ docker volume prune -a
WARNING! This will remove all local volumes not used by at least one container.
Are you sure you want to continue? [y/N] y

...

Total reclaimed space: 41.42GB
```

`docker volume prune` to the rescue!
