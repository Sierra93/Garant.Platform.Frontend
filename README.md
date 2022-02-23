# Garant.Platform.Frontend - Front-end маркетплейса для покупки и продажи бизнеса онлайн.
<hr>

# Стек фронта

**Структура и стили:** HTML, CSS.<br>
**CSS-препроцессор:** SCSS.<br>
**Готовые библиотеки и фреймворки компонентов и стилей:** Bootstrap, PrimeNG.<br>
**Клиентская логика:** TypeScript, Angular.

# Запуск проекта
**Для запуска проекта: ng serve.**<br>

# Возможные решения проблем с запуском
**Если проблема с запуском, скорее всего нужно:**<br>
**1. чтобы папка с node_modules находилась не только в корне проекта, но и в папке, где все локальные проекты в локальном репозитории. Это проблема именно локальная.**<br>
**2. npm install**<br>
**3. снова ng serve**

**Если при ng serve получили ошибку "Module build failed (from ./node_modules/sass-loader/dist/cjs.js)":**<br>
То нужно проделать следующие шаги:
1. npm uninstall sass-loader
2. npm install sass-loader@7.1.0 --save (или другую версию)
3. npm install style-loader
4. npm install node-sass
