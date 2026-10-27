---
document_id: SERVER_STATE
document_type: agent_readable_vps_passport
schema_version: "2.2"
document_updated: "2026-07-20"
last_documented_system_snapshot: "2026-07-20"
snapshot_window_utc: "2026-07-20T13:51:50+00:00 — 2026-07-20T14:01:39+00:00"
live_audit_on_document_updated_date: true
audit_mode: "read-only final verification plus local backup integrity verification"
live_audit_note: "Финальный контрольный сеанс прошёл без изменений VPS: проверены ресурсы, core services и autostart, listeners, UFW, effective SSH policy и Accepted logins, Nginx, production URLs, сертификаты и timer, отсутствие QuickTunnel, а также 8/8 SHA-256 checks локального backup-набора объёмом 57M."
default_current_state: UNKNOWN
secrets_policy: "Никогда не записывать реальные пароли, приватные ключи, passphrase, JWT, cookie, токены, строки подключения или содержимое env-файлов."
---

# SERVER_STATE — актуальный паспорт VPS

## 0. Как интерпретировать этот файл

Это карта текущих фактов, исторического контекста и честных неизвестных. Это не журнал всех команд и не универсальная инструкция по деплою.

Обязательные правила для человека и агента:

1. Последний подтверждённый live-snapshot выполнен **2026-07-20 с 13:51:50 до 14:01:39 UTC** — **с 16:51:50 до 17:01:39 по Москве**.
2. `CURRENT_VERIFIED` означает «наблюдалось в этом окне», а не вечную гарантию.
3. Последний сеанс был read-only: конфигурация, сервисы и проекты не изменялись. SSH-hardening, остановка QuickTunnel и создание локального backup-набора были выполнены и проверены на предыдущих этапах; здесь их состояние переподтверждено.
4. Если состояние не проверено или доказательство неполно, использовать `UNKNOWN`, а не достраивать ответ по старым заметкам.
5. Историческая команда или когда-то успешный ответ не доказывают текущее состояние.
6. Реальные секреты сюда не переносятся. Для них допустимы только placeholders, например `<SECRET_IN_PASSWORD_MANAGER>`.
7. Отдельная проектная документация описывает проект; этот паспорт описывает общую VPS и границы её экспозиции.

## 1. Статусы доказательств

| Статус | Строгое значение | Как читать |
| --- | --- | --- |
| `CURRENT_VERIFIED` | Факт проверен в live-сеансе 2026-07-20 UTC / MSK. | Действителен на момент указанного snapshot; перед рискованным действием перепроверить. |
| `HISTORICAL_CONFIRMED` | Событие прошлого было подтверждено, но не является текущим состоянием. | Полезно для истории и восстановления логики действий. |
| `DOCUMENTED_NOT_RECHECKED` | Значение есть в документации, но в последнем сеансе не проверялось. | Вероятный baseline, но не основание для изменения VPS. |
| `UNKNOWN` | Достоверного ответа нет либо проверка не покрыла вопрос. | Безопасный статус по умолчанию. |
| `PLANNED` | Следующий шаг согласован или предложен, но ещё не выполнен. | Не выдавать за работающую настройку. |

```text
PLANNED / DOCUMENTED_NOT_RECHECKED / UNKNOWN
  -> CURRENT_VERIFIED      только после фактической проверки

CURRENT_VERIFIED
  -> HISTORICAL_CONFIRMED  когда появляется более новый snapshot
```

## 2. Граница последнего live-сеанса

| Поле | Значение |
| --- | --- |
| Целевая машина | DigitalOcean VPS `core-server`, публичный IPv4 `165.22.25.56` |
| Источник evidence | Команды выполнял владелец в реальной SSH-сессии и передавал полный вывод в чат; агент не подключался к VPS напрямую |
| Начальный и итоговый контекст | `sergey@core-server:/home/sergey` по выделенному ED25519-ключу; административные read-only команды через `sudo` |
| Изменения в этом окне | Нет: это был финальный read-only аудит и проверка целостности уже созданного локального backup-набора |
| SSH evidence | Effective policy снова подтвердила key-only вход, запрет `root` и паролей; новые `Accepted` относятся только к `sergey` + `publickey` с ожидаемым ED25519 fingerprint. Меняющиеся IP соответствуют VPN владельца. |
| Что проверено | Ресурсы, failed units, active/enabled core services, listeners, UFW, SSH, Nginx/vhost, Certbot, QuickTunnel, web endpoints и SHA-256 backup-набора |
| Что намеренно не менялось | Nginx vhost, сертификаты, WordPress/MySQL/MongoDB данные, miniCRM, файлы проектов, UFW rules, версии ОС и пакетов |
| Точка паузы | Обязательная проверка завершена. Off-server backup, обновления, DigitalOcean panel checks и Nginx cleanup вынесены в неблокирующее обслуживание. |

## 3. Идентичность и ресурсы

| fact_id | Факт | Значение | Статус | Доказательство / ограничение |
| --- | --- | --- | --- | --- |
| `IDENTITY.PROVIDER` | Провайдер | DigitalOcean | `HISTORICAL_CONFIRMED` | Подтверждено историей и владельцем; панель аккаунта в этом сеансе не открывалась. |
| `IDENTITY.HOSTNAME` | Hostname | `core-server` | `CURRENT_VERIFIED` | `hostnamectl --static` → `core-server`. |
| `IDENTITY.PUBLIC_IPV4` | Публичный IPv4 | `165.22.25.56` | `CURRENT_VERIFIED` | По этому адресу выполнены новые SSH-входы; адрес также показан login banner. |
| `IDENTITY.PRIVATE_IPV4` | Приватный IPv4 | `10.19.0.5` | `HISTORICAL_CONFIRMED` | Показан login banner 2026-07-18; 2026-07-20 отдельно не перечитывался. Внешний маршрут по нему не предполагается. |
| `IDENTITY.OS` | ОС | Ubuntu 22.04.5 LTS | `HISTORICAL_CONFIRMED` | Показано при SSH-входе 2026-07-18; release-файл в финальном окне отдельно не перечитывался. |
| `IDENTITY.KERNEL` | Ядро | `5.15.0-185-generic`, x86_64 | `HISTORICAL_CONFIRMED` | Показано при SSH-входе 2026-07-18; `uname` в финальном окне не выполнялся. |
| `IDENTITY.CPU` | CPU | 1 vCPU | `CURRENT_VERIFIED` | `nproc` → `1`. |
| `IDENTITY.RAM` | RAM | 1.9 GiB total; 694 MiB used; около 1.0 GiB available | `CURRENT_VERIFIED` | `free -h`; моментальная нагрузка может меняться. |
| `IDENTITY.DISK` | Корневая FS | 68 GiB; 9.5 GiB used; 59 GiB available; 14% | `CURRENT_VERIFIED` | `df -h /`; inode usage 2% по `df -i /`. |
| `IDENTITY.UPTIME` | Uptime в начале аудита | 5 дней 23 часа 47 минут | `CURRENT_VERIFIED` | `uptime`; load average `0.00, 0.00, 0.00`, это временный показатель snapshot. |
| `IDENTITY.TIMEZONE` | Системное время | UTC (`+00:00`) | `CURRENT_VERIFIED` | `date -Is` → `2026-07-20T13:51:50+00:00`; состояние NTP отдельно не перепроверялось. |
| `IDENTITY.LOCALE` | Локаль | Исторически `C.UTF-8` | `DOCUMENTED_NOT_RECHECKED` | Команда `locale` в последнем сеансе не выполнялась. |
| `IDENTITY.FAILED_UNITS` | Failed systemd units | Не обнаружены | `CURRENT_VERIFIED` | `systemctl --failed --no-pager --no-legend` не вывел units. |

## 4. Операторский доступ по SSH

### 4.1 Текущий рабочий путь

На настроенном Mac основной вход:

```bash
ssh core-server
```

Явный эквивалент для диагностики:

```bash
ssh -o IdentitiesOnly=yes -i ~/.ssh/id_ed25519_core_server sergey@165.22.25.56
```

После входа обычный prompt — `sergey@core-server:~$`. Для одной административной команды используется `sudo <COMMAND>`; `sudo` запрашивает **пароль учётной записи `sergey`**, а не старый пароль `root` и не passphrase ключа.

| access_id | Текущая модель | Статус / доказательство |
| --- | --- | --- |
| `SSH.USER` | Рабочий оператор — отдельный пользователь `sergey`; uid/gid 1000 и группы `sergey`, `sudo` подтверждены ранее | `CURRENT_VERIFIED`: финальный аудит выполнен из его key-only сессии; точные uid/groups — `HISTORICAL_CONFIRMED` от 2026-07-18. |
| `SSH.KEY` | Выделенный ED25519-ключ `~/.ssh/id_ed25519_core_server` | `CURRENT_VERIFIED`: новый key-only вход успешен. Приватный ключ создан и хранится на настроенном Mac; на VPS копировался только `.pub`. Наличие отдельной резервной копии ключа не проверялось. |
| `SSH.AUTHORIZED_KEYS` | `/home/sergey/.ssh/authorized_keys`, одна строка | `HISTORICAL_CONFIRMED` 2026-07-18: owner `sergey:sergey`; каталог mode `700`, файл mode `600`; fingerprint прочитан успешно. Финальный key login доказывает работоспособность ключа, но не повторяет `stat`. |
| `SSH.SUDO` | `sergey` повышает права только для нужной команды | `CURRENT_VERIFIED`: административные read-only команды финального аудита через `sudo` выполнились; `sudo whoami` → `root` было отдельно подтверждено 2026-07-18. |
| `SSH.ROOT_LOGIN` | Прямой SSH-вход под `root` запрещён | `CURRENT_VERIFIED`: effective `PermitRootLogin no`; отдельный отрицательный password-only тест был выполнен 2026-07-18. |
| `SSH.PASSWORD_LOGIN` | SSH-аутентификация паролем запрещена для всех пользователей | `CURRENT_VERIFIED`: effective `PasswordAuthentication no`; отдельный отрицательный тест для `sergey` был выполнен 2026-07-18. |
| `SSH.MAX_AUTH_TRIES` | Не более 3 попыток в одном соединении | `CURRENT_VERIFIED`: effective `MaxAuthTries 3`. |

### 4.2 Серверная конфигурация

Активный override:

```text
/etc/ssh/sshd_config.d/00-core-server-hardening.conf

PermitRootLogin no
PasswordAuthentication no
KbdInteractiveAuthentication no
PubkeyAuthentication yes
MaxAuthTries 3
```

Mode `600` этого файла подтверждён во время hardening 2026-07-18, но в финальном окне повторно не снимался. Перед применением `sudo sshd -t` завершился без ошибок; затем выполнен `sudo systemctl reload ssh`, unit остался `active`, а `sudo sshd -T` подтвердил effective values. Префикс `00-` важен для этой конфигурации: include-файлы обрабатываются по имени, и OpenSSH использует первое полученное значение параметра.

### 4.3 Настройка на Mac

Существующие GitHub-ключи сначала были только перечислены и не изменялись. Для VPS создан отдельный ключ. В `~/.ssh/config` добавлен блок:

```sshconfig
Host core-server
    HostName 165.22.25.56
    User sergey
    IdentityFile ~/.ssh/id_ed25519_core_server
    IdentitiesOnly yes
    AddKeysToAgent yes
    UseKeychain yes
```

`~/.ssh/config` имеет mode `600`. Ключ добавлен в macOS Keychain командой `ssh-add --apple-use-keychain ~/.ssh/id_ed25519_core_server`; после этого `ssh core-server` прошёл без повторного запроса passphrase.

Эта настройка относится к конкретному Mac владельца. Другой агент или компьютер не должен считать, что у него автоматически есть приватный ключ или право SSH-доступа.

### 4.4 Что осталось от старого root/password

- Пользователь `root` **не был переименован** и не удалялся. Вместо него создан отдельный администратор `sergey`.
- Пароль `root` в этом сеансе не удалялся и не менялся, но использовать его через SSH сейчас нельзя: root-login и password authentication выключены.
- Историческая команда `ssh root@165.22.25.56` сохранена только как объяснение прошлого способа. **Это не рабочий fallback.**
- Возможное восстановление через DigitalOcean web console/recovery console ещё не проверено. Перед тем как полагаться на него, нужно отдельно подтвердить доступ и процедуру без отключения рабочего ключевого входа.
- Активная root-сессия была нужна только как страховка во время миграции; после двух положительных и двух отрицательных тестов её можно безопасно закрыть.

### 4.5 Четыре разных объекта, которые нельзя путать

| Объект | Где применяется | Секрет? |
| --- | --- | --- |
| Пароль `root` | Исторически — старый SSH-вход; потенциально — локальная console/recovery, если это будет проверено | Да |
| Пароль `sergey` | `sudo` и локальная аутентификация учётной записи | Да |
| Passphrase SSH-ключа | Расшифровывает приватный ключ на Mac; Keychain может хранить её | Да |
| Публичный ключ / fingerprint / randomart | Устанавливается на сервер или помогает сверить ключ | Нет; но приватный ключ рядом с ним всё равно не публиковать |

## 5. Инвентарь сервисов

| service_id | Компонент | Состояние snapshot | Статус | Ограничение / следующая проверка |
| --- | --- | --- | --- | --- |
| `SERVICE.SSH` | OpenSSH / `sshd` | Unit active и enabled; публичный TCP 22 v4/v6; key-only user `sergey`; root/password login disabled | `CURRENT_VERIFIED` | При любом изменении держать второй проверенный сеанс и сначала запускать `sshd -t`. |
| `SERVICE.RESOLVED` | `systemd-resolved` | Локальный resolver `127.0.0.53:53` | `CURRENT_VERIFIED` | Listener и owning process видны в `ss -tulpn`. |
| `SERVICE.NGINX` | Nginx | Unit active и enabled; конфигурация валидна; public 80/443 v4/v6; production URLs отвечали 200 | `CURRENT_VERIFIED` | Набор vhost перечислен ниже; необязательная очистка исторических vhost отложена. |
| `SERVICE.MYSQL` | MySQL | Unit active и enabled; `mysqld` слушает только `127.0.0.1:3306` и `127.0.0.1:33060` | `CURRENT_VERIFIED` | Listener и autostart подтверждены; accounts и application-level health этим не проверены. |
| `SERVICE.PHP` | PHP-FPM | `php8.1-fpm` active и enabled; Transmission vhost направляет PHP в `/run/php/php8.1-fpm.sock`; WordPress URLs отвечали 200 | `CURRENT_VERIFIED` | Точная CLI-версия и полный PHP config отдельно не инвентаризировались. |
| `SERVICE.MONGODB` | MongoDB / `mongod` | Unit active и enabled; `mongod` слушает только `127.0.0.1:27017` | `CURRENT_VERIFIED` | Сетевая граница и autostart подтверждены; состояние прикладных коллекций относится к проекту miniCRM. |
| `SERVICE.NODE` | Node.js / npm | Исторически Node.js 20 LTS для miniCRM | `DOCUMENTED_NOT_RECHECKED` | `node -v`, `npm -v` и runtime miniCRM не проверялись. |
| `SERVICE.UFW` | UFW | Active; logging low; deny incoming / allow outgoing; разрешены только OpenSSH и Nginx Full, v4/v6 | `CURRENT_VERIFIED` | DigitalOcean Cloud Firewall остаётся отдельным неизвестным слоем. |
| `SERVICE.CLOUDFLARED` | Cloudflare `cloudflared` | QuickTunnel не работает: units, unit files, processes и listeners отсутствуют | `CURRENT_VERIFIED` | Исторические units использовали `/usr/bin/cloudflared`; наличие бинарника/пакета сейчас отдельно не проверялось и ничего не публикует само по себе. |
| `SERVICE.SWAP` | Swap | Swap отсутствует (`0B`) | `CURRENT_VERIFIED` | Решение о добавлении принимать после наблюдения за нагрузкой. |
| `SERVICE.CERTBOT` | Certbot | Оба сертификата valid примерно ещё 84 дня; `snap.certbot.renew.timer` существует, запускался и имеет следующий запуск | `CURRENT_VERIFIED` | Версия 5.7.0 подтверждена ранее; `certbot renew --dry-run` ещё не выполнен. |

## 6. Сетевая экспозиция

| network_id | Endpoint / правило | Состояние snapshot | Статус | Критерий безопасности |
| --- | --- | --- | --- | --- |
| `NETWORK.SSH` | `*:22/tcp`, `[::]:22/tcp` | Публичный `sshd`; password authentication отключена, root запрещён; проверенный операторский key-user — `sergey` | `CURRENT_VERIFIED` | `AllowUsers`/`AllowGroups` не настраивались: не утверждать, что sshd технически допускает только один username. Публичный порт всё равно будут сканировать боты. |
| `NETWORK.HTTP` | `*:80/tcp`, `[::]:80/tcp` | Nginx | `CURRENT_VERIFIED` | Ожидаемый публичный web endpoint. |
| `NETWORK.HTTPS` | `*:443/tcp`, `[::]:443/tcp` | Nginx | `CURRENT_VERIFIED` | Ожидаемый публичный web endpoint. |
| `NETWORK.MONGODB` | `127.0.0.1:27017` | Только loopback | `CURRENT_VERIFIED` | Любой public bind — stop-сигнал. |
| `NETWORK.MYSQL` | `127.0.0.1:3306`, `127.0.0.1:33060` | Только loopback | `CURRENT_VERIFIED` | Не публиковать без отдельной архитектуры и firewall policy. |
| `NETWORK.MINICRM` | Исторический backend port `3000` | В `ss -tulpn` listener 3000 не найден | `CURRENT_VERIFIED` | Это доказывает только отсутствие listener в момент snapshot, а не состояние файлов проекта. |
| `NETWORK.UFW` | Host firewall | Только OpenSSH и Nginx Full разрешены inbound, v4/v6 | `CURRENT_VERIFIED` | Сопоставлено с `ss`; cloud firewall этим не доказан. |
| `NETWORK.DO_CLOUD_FIREWALL` | DigitalOcean Cloud Firewall | Не проверен | `UNKNOWN` | Проверить read-only в панели/API провайдера. |
| `NETWORK.QUICK_TUNNELS` | Исходящие Cloudflare QuickTunnel | После согласованного stop процессов и ports нет | `CURRENT_VERIFIED` | Не путать QuickTunnel с постоянным DuckDNS hostname: DuckDNS остаётся нужен Transmission. |

## 7. Инвентарь проектов

### 7.1 miniCRM

| project_field | Значение | Статус | Примечание |
| --- | --- | --- | --- |
| `project_id` | `minicrm` | `HISTORICAL_CONFIRMED` | Отдельный проект на общей VPS. |
| `path` | `/opt/mini-crm` | `HISTORICAL_CONFIRMED` | Путь существовал и был архивирован 2026-07-19; содержимое проекта намеренно не инвентаризировалось в финальном аудите. |
| `backend` | Node.js, Fastify, MongoDB, JWT | `DOCUMENTED_NOT_RECHECKED` | Версия кода и dependencies неизвестны. |
| `database` | MongoDB, логическое имя `mini_crm`, loopback connection | `HISTORICAL_CONFIRMED` | База и отдельный dump подтверждены 2026-07-19; Mongo listener 2026-07-20 снова закрыт на loopback. Детальный разбор данных не относится к общему аудиту VPS. |
| `runtime_start` | Исторически ручной `npm run start` | `HISTORICAL_CONFIRMED` | Постоянный supervisor ранее не был настроен. |
| `runtime_current` | Listener на историческом port 3000 отсутствует | `CURRENT_VERIFIED` | Supervisor, иной порт и application health остаются `UNKNOWN`. |
| `public_exposure_current` | В проверенных listeners и enabled Nginx sites miniCRM не обнаружена | `CURRENT_VERIFIED` | Ограничено проверенным snapshot и текущими конфигурациями. |
| `security_material` | `JWT_SECRET=<ROTATE_AND_VERIFY>`; `<TEST_CREDENTIALS_ROTATION_REQUIRED>` | `UNKNOWN` | Реальные значения намеренно не воспроизводятся. |
| `authoritative_notes` | Конспект находится в корне проекта `mini-crm` | `HISTORICAL_CONFIRMED` | Проектная документация намеренно не связана прямой кнопкой из server notes. |

Граница ответственности: miniCRM является отдельным проектным handoff. Его код, запуск, JWT, учётные записи, supervisor и будущий Nginx route должен разбирать агент miniCRM. Это **не блокирует** размещение другого изолированного проекта на VPS. Не запускать miniCRM автоматически и не открывать порт `3000` наружу.

### 7.2 Transmission

| project_field | Значение | Статус | Примечание |
| --- | --- | --- | --- |
| `project_id` | `transmission` | `HISTORICAL_CONFIRMED` | WordPress-проект на общей VPS. |
| `stack` | WordPress + Nginx + PHP-FPM + MySQL | `CURRENT_VERIFIED` | Конфигурация Nginx и HTTP responses проверены. |
| `filesystem_path` | `/var/www/transmission-school.ru` | `HISTORICAL_CONFIRMED` | Путь был прочитан из рабочих vhost и архивирован 2026-07-19; финальный HTTP-аудит подтвердил работу сайта, но Nginx `root` повторно не выводил. |
| `canonical_wordpress_url` | `https://transmission-school.duckdns.org` | `HISTORICAL_CONFIRMED` | Live `home` и `siteurl` были проверены до финального окна; DuckDNS endpoint 2026-07-20 снова вернул 200. Это рабочий hostname, а не мусор. |
| `ru_vhost` | `transmission-school.ru` и `www.transmission-school.ru`, HTTP/HTTPS | `CURRENT_VERIFIED` | Сейчас отдавал 200; будущий clean redirect на DuckDNS ещё не настроен. |
| `duckdns_vhost` | `transmission-school.duckdns.org`, HTTP/HTTPS | `CURRENT_VERIFIED` | Отдавал 200; vhost и сертификат необходимо сохранить. |
| `route_test_vhost` | Enabled symlink `transmission-route-test`; исторически `165-22-25-56.sslip.io` и `/hero-test.jpg` | `CURRENT_VERIFIED` | Наличие symlink переподтверждено 2026-07-20; точное содержимое конфига читалось ранее. Необязательный кандидат на последующее удаление. |
| `default_vhost` | Enabled symlink `default`; исторически стандартная страница `/var/www/html/index.nginx-debian.html` | `CURRENT_VERIFIED` | Наличие symlink переподтверждено 2026-07-20; точное содержимое читалось ранее. Необязательный кандидат на catch-all cleanup. |
| `tls_ru` | ECDSA cert для `.ru` + `www`, valid до 2026-10-12 20:58:54 UTC | `CURRENT_VERIFIED` | Около 84 дней на момент snapshot; сохранить для рабочего HTTPS/возможного redirect. |
| `tls_duckdns` | ECDSA cert для DuckDNS, valid до 2026-10-13 09:01:45 UTC | `CURRENT_VERIFIED` | Около 84 дней; автопродление timer найдено, dry-run pending. |
| `health_snapshot` | `.ru`, `www`, DuckDNS, DuckDNS `/wp-admin/` и `/wp-json/` вернули HTTP 200 после follow redirects | `CURRENT_VERIFIED` | Моментальная проверка 2026-07-20, не постоянный monitoring. Route-test в этом финальном curl-наборе не проверялся. |
| `quick_tunnel_history` | Два transient Cloudflare QuickTunnel | `HISTORICAL_CONFIRMED` | Остановлены и больше не нужны для рабочего DuckDNS-маршрута. |
| `backup_current` | Свежий server-side набор содержит production SQL, файлы Transmission, miniCRM dump/files и критичные конфиги; 8/8 SHA-256 checks прошли, общий размер 57M | `CURRENT_VERIFIED` | Это локальный rollback-набор на том же VPS. Off-server copy, расписание/retention и полноценный restore test остаются `UNKNOWN`. |
| `authoritative_notes` | [`server-atlas/my-first-project/transmission-deployment.html`](server-atlas/my-first-project/transmission-deployment.html) | `HISTORICAL_CONFIRMED` | Подробный проектный кейс; live-статус сверять здесь. |

### 7.3 Готовность к следующему проекту

**Статус: `READY_WITH_PROJECT_CAPACITY_CHECK`.** На момент snapshot VPS готова принять дополнительный лёгкий изолированный проект. Общесерверных блокеров не найдено: SSH и firewall настроены, публичная граница понятна, базы закрыты на loopback, core services работают, web-проекты отвечают, локальный rollback-набор проверен.

Это не обещание неограниченной мощности. Перед каждым новым деплоем агент проекта обязан учесть **1 vCPU, 1.9 GiB RAM, около 1.0 GiB available и отсутствие swap**, определить собственные path/service/port и убедиться, что приложение:

- слушает `127.0.0.1:<UNIQUE_PORT>`, а наружу выходит через отдельный Nginx vhost и HTTPS;
- не публикует MySQL, MongoDB или иной datastore напрямую;
- не переиспользует пути, units, users, базы и секреты Transmission или miniCRM;
- проходит `nginx -t`, service health и HTTP-проверки после каждого изменения;
- не изменяет DuckDNS vhost, WordPress `home/siteurl` или miniCRM без отдельного project-owned решения.

Off-server backup и обновления ОС рекомендуются в ближайшее обслуживание, но не являются блокером обычного изолированного деплоя. Для тяжёлого приложения или новой базы требуется отдельная оценка ресурсов.

## 8. Безопасность и открытые вопросы

| issue_id | Приоритет | Суть после live-сеанса | Статус доказательства | Следующий безопасный этап |
| --- | --- | --- | --- | --- |
| `SEC.SSH.ROOT_PASSWORD` | закрыт (был high) | Прямой root-login и вся password-аутентификация по SSH отключены; key-only вход `sergey` проверен | `CURRENT_VERIFIED` | Не включать обратно «на всякий случай». Хранить старый способ только как историю. |
| `SEC.SSH.FAILED_BOTS` | medium | Публичный SSH получает автоматические неуспешные попытки и предложения устаревших RSA/DSS ключей | `HISTORICAL_CONFIRMED` | Это не доказывает взлом; следить за `Accepted`, а не паниковать из-за каждого `[preauth]`. |
| `SEC.SSH.ACCEPTED_LOGINS` | закрыт для проверенного окна | Старые `root` + password события относятся к периоду до hardening. После него и в свежем окне найдены только ожидаемые `sergey` + `publickey` с одним ED25519 fingerprint; смена IP согласуется с VPN владельца | `CURRENT_VERIFIED` | Незнакомых users/methods в проверенном окне не найдено. Будущие `Accepted` проверять периодически. |
| `SEC.SSH.RECOVERY` | medium | Рабочий ключевой вход есть, но DigitalOcean console/recovery путь не тестировался | `UNKNOWN` | Отдельно подтвердить console access и план восстановления; не ломать рабочий SSH ради теста. |
| `SEC.UFW` | закрыт для snapshot | Host firewall active; inbound только SSH/HTTP(S) | `CURRENT_VERIFIED` | Повторять после добавления нового проекта или порта. |
| `SEC.DO_CLOUD_FIREWALL` | medium | Наличие и правила DigitalOcean Cloud Firewall не подтверждены | `UNKNOWN` | Проверить read-only в панели/API. UFW не заменяет этот факт. |
| `SEC.CLOUDFLARE_QUICK_TUNNELS` | закрыт | Два временных transient unit остановлены; processes/listeners отсутствуют | `CURRENT_VERIFIED` | Позже решить, оставлять ли установленный binary. Не удалять DuckDNS vhost. |
| `SEC.BACKUP.OFF_SERVER` | high operational; не блокер нового deploy | Локальный rollback-набор проверен, но он погибнет вместе с VPS; off-server copy и DigitalOcean Backups/Snapshot не подтверждены | `UNKNOWN` | В ближайшее обслуживание включить DO Backup/Snapshot и/или вынести зашифрованную копию на Mac/другое хранилище. Restore drill выполнить отдельно. |
| `SEC.SWAP` | low | Swap отсутствует | `CURRENT_VERIFIED` | Не добавлять автоматически; решить по memory pressure и роли VPS. |
| `SEC.MINICRM.RUNTIME` | project handoff; не глобальный блокер | На port 3000 listener нет; состояние runtime и health намеренно не разбиралось | `UNKNOWN` | Передать агенту miniCRM; провести project-owned audit без автоматического запуска. |
| `SEC.MINICRM.DEV_CREDENTIALS` | project handoff; важно для miniCRM | В старых dev-заметках были раскрыты JWT secret и тестовые credentials | `HISTORICAL_CONFIRMED` | Агент miniCRM должен проверить ротацию/инвалидирование. Реальные значения сюда не записывать. |
| `SEC.MONGODB.BIND` | закрыт для snapshot | MongoDB слушает только loopback | `CURRENT_VERIFIED` | Любой future public bind — stop-сигнал. |
| `OPS.CERTBOT.DRY_RUN` | recommended soon; не блокер | Snap renewal timer найден и работает, оба cert valid примерно 84 дня; фактический renewal dry-run не выполнен | `CURRENT_VERIFIED` | В отдельном безопасном шаге запустить `sudo certbot renew --dry-run`, затем проверить Nginx и URLs. |
| `OPS.SYSTEM_UPDATES` | recommended soon; не блокер | 2026-07-18 login banner показывал доступные обновления; свежий точный список 2026-07-20 не снимался | `DOCUMENTED_NOT_RECHECKED` | Получить `apt list --upgradable`, оценить изменения и применить обычные updates в контролируемом окне. Не запускать `do-release-upgrade`. |
| `OPS.NGINX.CLEANUP` | low / optional | Route-test и Ubuntu default vhost всё ещё enabled; рабочие `.ru` и DuckDNS endpoints не страдают | `CURRENT_VERIFIED` | Отложенная гигиена, не условие деплоя. Не менять DuckDNS/WordPress URL. При решении: backup → одно изменение → `nginx -t` → reload → HTTP checks. |
| `OPS.MONITORING` | low / optional | Постоянный monitoring ресурсов и сервисов не подтверждён | `UNKNOWN` | Настраивать по мере роста ценности/нагрузки; разовый snapshot monitoring не заменяет. |

## 9. Резервное копирование: строгая модель

```yaml
backup_state:
  local_backup_path: "/root/server-backups/2026-07-19-pre-cleanup"
  local_backup_artifacts: CURRENT_VERIFIED
  local_backup_scope: "Transmission DB/files; miniCRM DB/files; critical server configs; package/snap/enabled-service inventories"
  local_backup_integrity: "CURRENT_VERIFIED — 8/8 SHA-256 checks OK on 2026-07-20"
  local_backup_total_size: "57M"
  local_backup_file_permissions: "HISTORICAL_CONFIRMED — root:root mode 600 on 2026-07-19"
  digitalocean_managed_backups: UNKNOWN
  digitalocean_snapshots: UNKNOWN
  automated_database_backup: UNKNOWN
  automated_files_backup: UNKNOWN
  off_server_copy: UNKNOWN
  retention_policy: UNKNOWN
  restore_procedure_documented: UNKNOWN
  restore_test_successful: UNKNOWN
  overall_status: "LOCAL_ROLLBACK_READY__OFF_SERVER_PROTECTION_NOT_ESTABLISHED"
```

- В набор входят `transmission-production.sql`, `mini-crm.archive.gz`, архивы файлов обоих проектов, архив критичных конфигов, inventories и `SHA256SUMS`. Содержимое секретных файлов в паспорт не переносится.
- Production SQL сопоставлен с 12 live WordPress tables; отдельный miniCRM archive был создан из базы `mini_crm`. Архивы прошли проверки формата/dry-run на этапе создания; финальный аудит повторно подтвердил все 8 checksum.
- Это пригодный локальный rollback-набор перед изменениями, но **не полная backup system**: он находится на том же Droplet и не переживёт его потерю.
- Отдельные локальные факты могут быть `CURRENT_VERIFIED`. Статус полноценной системы требует off-server копии, расписания, retention, контроля ошибок и проверенного восстановления.
- Полный restore drill проводить только в изолированной среде, не поверх production.

## 10. Канонические документы

| Документ | Назначение | Граница |
| --- | --- | --- |
| [`server-notes.html`](server-notes.html) | Человеческий учебный конспект: путь по VPS и подробный SSH-hardening track. | Не заменяет live-state. |
| [`server-story.html`](server-story.html) | Рассказ простыми словами о SSH, проверках и создании backup-набора. | Учебное объяснение, не источник live-фактов. |
| Конспект в корне проекта `mini-crm` | Проектная история и эксплуатация miniCRM. | Старые health checks и secrets не являются текущим фактом. |
| [`server-quick-diagnostics.html`](server-quick-diagnostics.html) | Короткая read-only диагностика VPS. | Наличие checklist не означает, что проверка выполнена. |
| [`server-atlas/my-first-project/transmission-deployment.html`](server-atlas/my-first-project/transmission-deployment.html) | Проектный deploy/operations кейс Transmission. | Текущий production URL и runtime сверять с этим паспортом. |
| [`важное доделать по серверу.txt`](важное%20доделать%20по%20серверу.txt) | Очередь незавершённых работ и точка паузы. | Не выдавать `PLANNED` за выполненное. |

При расхождении источников приоритет:

1. Новый `CURRENT_VERIFIED` факт с временем и командой.
2. Более новый датированный snapshot.
3. Этот паспорт как текущая карта.
4. Исторические заметки как контекст.

## 11. Краткий read-only audit checklist

Полная процедура: [`server-quick-diagnostics.html`](server-quick-diagnostics.html).

```bash
# Контекст и ресурсы
whoami; hostnamectl --static; pwd; date -Is
uptime
nproc
free -h
df -h /
df -i /
systemctl --failed --no-pager --no-legend

# Network boundary и firewall
sudo ss -tulpn
sudo ufw status verbose
sudo ufw status numbered

# Effective SSH policy; не печатает ключи или пароли
sudo sshd -T | grep -E '^(permitrootlogin|passwordauthentication|pubkeyauthentication|kbdinteractiveauthentication|maxauthtries) '

# Успешные входы отделять от bot failures
sudo journalctl -u ssh --since '7 days ago' --no-pager --grep='Accepted (password|publickey|keyboard-interactive)'

# Web и сертификаты
sudo nginx -t
sudo find /etc/nginx/sites-enabled -maxdepth 1 -type l -printf '%f -> %l\n'
sudo certbot certificates
systemctl list-timers --all --no-pager | grep -i certbot

# Временные tunnels
systemctl list-units --type=service --all 'cloudflared*' --no-pager
pgrep -a -x cloudflared
```

Этот checklist только наблюдает. Из него нельзя делать автоматический `stop`, `restart`, `rm`, `chmod`, `chown`, менять UFW, SSH, Nginx или данные проектов.

## 12. Agent handoff template

Не заполнять секретами и не вставлять несанитизированные env/logs.

```yaml
handoff:
  passport_schema: "SERVER_STATE/2.2"
  audit_started_at: "<ISO-8601>"
  audit_finished_at: "<ISO-8601>"
  audit_mode: "read-only|approved-change"
  live_audit_performed: true
  target_confirmed:
    user: "<SANITIZED_USER_OR_ROLE>"
    hostname: "<EXPECTED_HOSTNAME_OR_REDACTED>"
  commands_executed:
    - command: "<COMMAND_WITH_PLACEHOLDERS>"
      exit_code: "<INTEGER_OR_UNKNOWN>"
      sanitized_result: "<NO_SECRETS_TOKENS_COOKIES>"
  fact_updates:
    - fact_id: "<EXISTING_FACT_ID>"
      new_status: "CURRENT_VERIFIED|UNKNOWN"
      observed_at: "<ISO-8601>"
      evidence_command: "<READ_ONLY_COMMAND>"
      limitation: "<WHAT_THIS_DOES_NOT_PROVE>"
  ssh_evidence:
    accepted_logins_reviewed: "true|false"
    unfamiliar_accepted_found: "true|false|unknown"
  changes_made_to_vps:
    - "<EXPLICITLY_APPROVED_CHANGE_OR_NONE>"
  unresolved_unknowns:
    - "<FACT_OR_ISSUE_ID>"
  forbidden_data_copied: false
```

### Handoff acceptance rules

- `live_audit_performed: true` допустимо только после реального SSH/live-сеанса.
- Каждый новый `CURRENT_VERIFIED` обязан иметь дату, команду и краткое evidence.
- Если команда не выполнена или вывод неполон — `UNKNOWN`.
- Незнакомый `Accepted`, неожиданный public listener или database вне loopback — incident signal: сначала зафиксировать, затем запрашивать отдельное разрешение на изменение.
- После принятого handoff обновлять `last_documented_system_snapshot` только фактической датой live-аудита.

## 13. Состояние паспорта после финального read-only аудита

```yaml
passport_summary:
  document_updated_local: "2026-07-20 Europe/Moscow"
  last_live_snapshot_utc: "2026-07-20T13:51:50+00:00 — 2026-07-20T14:01:39+00:00"
  deployment_readiness: "READY_WITH_PROJECT_CAPACITY_CHECK"
  current_primary_access: "ssh core-server -> sergey -> sudo"
  ssh_root_login: "disabled and negatively tested"
  ssh_password_authentication: "disabled and negatively tested"
  accepted_ssh_since_hardening: "expected sergey + publickey only in reviewed window"
  core_services_active_and_enabled: ["ssh", "nginx", "php8.1-fpm", "mysql", "mongod"]
  quick_tunnels: "absent; no units, unit files, processes or listeners"
  public_listeners: ["22/ssh", "80/http", "443/https"]
  loopback_databases: ["127.0.0.1:27017/mongodb", "127.0.0.1:3306/mysql", "127.0.0.1:33060/mysqlx"]
  transmission_canonical_url: "https://transmission-school.duckdns.org"
  transmission_health: "ru, www, DuckDNS, wp-admin and wp-json returned HTTP 200"
  certificates: "valid approximately 84 days at snapshot; snap renewal timer present"
  local_backup: "57M; 8/8 SHA-256 checks OK; same-VPS rollback only"
  nginx_cleanup_deferred_non_blocking: true
  capacity_boundary: "1 vCPU; 1.9 GiB RAM; about 1.0 GiB available; no swap"
  highest_priority_unknowns:
    - "SEC.BACKUP.OFF_SERVER"
    - "SEC.SSH.RECOVERY"
    - "SEC.DO_CLOUD_FIREWALL"
  recommended_non_blocking_maintenance:
    - "ordinary OS updates after impact review"
    - "certbot renew --dry-run"
    - "off-server backup and later restore drill"
  project_handoff_items:
    - "miniCRM runtime/secret rotation belong to the miniCRM agent"
```
