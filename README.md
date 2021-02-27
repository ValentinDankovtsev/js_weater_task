![PR Sanity Check](https://github.com/ValentinDankovtsev/js_weater_task/workflows/PR%20Sanity%20Check/badge.svg)
![Build and Deploy](https://github.com/ValentinDankovtsev/js_weater_task/workflows/Build%20and%20Deploy/badge.svg)
[![codecov](https://codecov.io/gh/ValentinDankovtsev/js_weater_task/branch/feature/graph/badge.svg?token=D2E8Y00DHZ)](https://codecov.io/gh/ValentinDankovtsev/js_weater_task)
![Run Test Suites](https://github.com/ValentinDankovtsev/js_weater_task/workflows/Run%20Test%20Suites/badge.svg)

<h2>This repository about app whith weather.</h2><p>&#9728;</p>
Домашннее задание от школы https://otus.ru/.

JS

<pre><code>function showWeather(el, weatherInfo) {
                el.innerHTML = `Temperature °C in the selected: ${JSON.stringify(weatherInfo)}`;
        }</code></pre>

Пользователь имеет возможность при входе на сайт видеть свое местоположение и погоду. так же пользователь может посмотреть погоду в любом другом городе. сохраняется список из десяти городов в браузере, при клике по любому городу из списка можно увидеть погоду и карту этой местности. в списке элемены не повторяются.
