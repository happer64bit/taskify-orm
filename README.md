# Taskify-ORM (Alpha) + Not working NOW

## Installions
```bash
npm i @happer64bit/taskify-orm # I don't know if it will work
```

## Coding

```ts
import TaskifyOrm from '@happer64bit/taskify-orm';

const orm = TaskifyOrm("database.sqlite") // using :memory: by default

orm.createTaskTable("SHOPPING LIST")
```