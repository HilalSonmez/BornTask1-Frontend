# BornTask1 Frontend

Born Otomasyon teknik değerlendirme görevi kapsamında geliştirilmiş Angular 18 frontend projesidir.

## Kullanılan Teknolojiler

* Angular 18
* TypeScript
* Angular Material
* Standalone Components
* Angular Router
* HttpClient
* LocalStorage ile token yönetimi

## Özellikler

* Ana Sayfa
* Kullanıcı Giriş Ekranı
* Kullanıcı Kayıt Ekranı
* E-Mail Doğrulama Ekranı
* Şifremi Unuttum Ekranı
* Şifre Sıfırlama Ekranı
* JWT Token ile Yetkilendirme
* Route Guard ile korumalı sayfa yapısı
* Form Kayıt Ekranı
* Başarı ve hata mesajları için popup gösterimi
* Angular Material ile tasarlanmış kullanıcı arayüzü

## Projeyi Çalıştırma

1. Gerekli paketleri yükleyin:

```bash
npm install
```

2. Projeyi çalıştırın:

```bash
ng serve
```

3. Tarayıcıdan uygulamayı açın:

```text
http://localhost:4200
```

## Backend Bağlantısı

Frontend uygulaması backend API ile haberleşmektedir.

API adresi geliştirme ortamında aşağıdaki şekilde kullanılmıştır:

```text
https://localhost:7183
```

Backend projesi çalışmadan frontend üzerindeki kayıt, giriş, e-mail doğrulama, şifre sıfırlama ve form kayıt işlemleri çalışmayacaktır.

## Not

Bu proje Angular 18 standalone component yapısı kullanılarak geliştirilmiştir.

Arayüz tasarımında Angular Material bileşenleri kullanılmıştır.
