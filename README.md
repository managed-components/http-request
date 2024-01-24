# HTTP Request Managed Component

## Documentation

Managed Components docs are published at **https://managedcomponents.dev** .

Find out more about Managed Components [here](https://blog.cloudflare.com/zaraz-open-source-managed-components-and-webcm/) for inspiration and motivation details.

[![Released under the Apache license.](https://img.shields.io/badge/license-apache-blue.svg)](./LICENSE)
[![PRs welcome!](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## 🚀 Quickstart local dev environment

1. Make sure you're running node version >=18.
2. Install dependencies with `npm i`
3. Run unit test watcher with `npm run test:dev`

## ⚙️ Tool Settings

> Settings are used to configure the tool in a Component Manager config file

There are no tool-level settings required for this MC.

## 🧱 Fields Description

> Fields are properties that can/must be sent with certain events

### Endpoint `String` _required_

`__setting_endpoint` specifies the server endpoint URL to which the request should be sent.

### Method `String` _optional_

`__setting_method` specifies the HTTP request method you wish to use. There are three accepted values: `post`, `post urlencoded`, and `get`. If you do not specify the method, it will default to GET.

## 📝 License

Licensed under the [Apache License](./LICENSE).
