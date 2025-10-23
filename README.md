# Nexus Store

**Descrição**
Nexus Store é um e‑commerce mobile feito com Expo / React Native. Este README explica como preparar o ambiente, instalar as dependências listadas e executar o projeto localmente.

---

## Autores
- Andrey Montibeller
- Gustavo Almeida
- Samuel Boaz
- Rian Eduardo

---

## Pré‑requisitos
Antes de começar, instale as seguintes ferramentas na sua máquina:

- Node.js (recomenda‑se LTS — 16.x / 18.x ou superior)
- Git
- npm (vem com o Node)
- pnpm (vamos instalar abaixo globalmente)
- Para rodar em emuladores: Android Studio (Android) e/ou Xcode (macOS para iOS)

> Observação: o projeto foi desenvolvido com Expo; não é necessário instalar o React Native CLI globalmente para rodar em modo managed.

---

## Passo a passo — instalação rápida
Siga exatamente estes comandos no terminal, na raiz do repositório do projeto.

1. **Instalar pnpm globalmente**

```bash
npm install -g pnpm
```

2. **(Opcional, se você ainda não atualizou o Expo no projeto)**

```bash
npx expo upgrade
```

3. **Instalar as dependências do projeto (usando `expo install` para dependências compatíveis com Expo)**

> O comando abaixo usa `npx expo install` para garantir que as versões instaladas sejam compatíveis com a versão do Expo do projeto.

```bash
npx expo install @expo/metro-runtime @expo/vector-icons @react-native-async-storage/async-storage @react-native-community/datetimepicker @supabase/supabase-js expo-blur expo-camera expo-constants expo-document-picker expo-font expo-haptics expo-image expo-image-picker expo-linear-gradient expo-location expo-linking expo-router expo-splash-screen expo-status-bar expo-symbols expo-system-ui expo-web-browser lottie-react-native react-native-calendars react-native-dynamic react-native-gesture-handler react-native-paper react-native-reanimated react-native-safe-area-context react-native-screens react-native-super-grid react-native-vector-icons react-native-web react-native-webview react-refresh tslib expo-notifications expo-device expo-application expo-file-system react-native-chart-kit expo-sharing expo-audio expo-video @react-native-community/netinfo date-fns expo-sensors react-native-markdown-display @stripe/stripe-react-native expo-modules-autolinking react-native-url-polyfill @privacyresearch/libsignal-protocol-typescript @react-native-picker/picker @react-navigation/native lucide-react-native nativewind zustand react-native-svg @lucide/lab @react-navigation/bottom-tabs expo-av expo-media-library @react-navigation/elements @react-navigation/stack expo-asset expo-clipboard expo-crypto expo-image-manipulator expo-local-authentication expo-mail-composer expo-network expo-screen-orientation expo-secure-store expo-sqlite @expo-google-fonts/inter @react-native-community/slider expo-calendar expo-contacts expo-gl expo-localization expo-navigation-bar expo-print expo-screen-capture expo-speech react-native-crypto-js react-native-elements react-native-maps react-native-qrcode-svg react-native-view-shot react-native-webrtc @apollo/client @expo/styleguide-native @graphql-codegen/introspection @react-navigation/core @react-navigation/drawer @react-navigation/native-stack @react-navigation/routers dedent es6-error graphql immutable path-to-regexp prop-types querystring react-redux react-string-replace redux redux-thunk semver snack-content expo-manifests expo-store-review expo-task-manager react-native-fade-in-image react-native-infinite-scroll-view react-native-keyboard-aware-scroll-view react-native-keyboard-controller react-native-pager-view react-native-edge-to-edge @gorhom/bottom-sheet @react-native-masked-view/masked-view @react-native-segmented-control/segmented-control @shopify/flash-list @shopify/react-native-skia expo-auth-session url @react-native-clipboard/clipboard
```

> **Importante:** o comando acima é extenso — execute na raiz do projeto. Se houver problemas com algum pacote específico, copie apenas os pacotes que precisar e rode novamente.

4. **Instalar dependências do gerenciador de pacotes (pnpm)**

```bash
pnpm install
```

5. **Iniciar o servidor de desenvolvimento com cache limpo**

```bash
npx expo start -c
```

Isso abre a interface do Expo DevTools no navegador e disponibiliza QR code para testar no dispositivo físico (Expo Go) ou abrir em emuladores.

---

## Executando no emulador
- Android: com o emulador aberto, use `a` no terminal do Metro / Expo DevTools ou execute `npx expo run:android`.
- iOS (macOS): abra o projeto no Xcode ou use `npx expo run:ios`.

---

## Variáveis de ambiente e configurações externas
O projeto usa serviços externos (ex.: Supabase, Stripe). Crie um arquivo `.env` (ou use outra estratégia de env que o projeto já esteja configurado) na raiz com as chaves necessárias, por exemplo:

```
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
STRIPE_PUBLISHABLE_KEY=...
...
```

**Nunca** comite chaves secretas no repositório público.

---

## Problemas comuns & soluções rápidas
- **Erro de cache / módulos não encontrados:** delete `node_modules` e `pnpm-lock.yaml` e rode `pnpm install` novamente.
- **Erro com pods (iOS bare workflow):** entre na pasta `ios` e rode `pod install` (requer CocoaPods). Em projetos gerenciados Expo, normalmente não há pasta `ios`.
- **Incompatibilidade de versão do React Native / bibliotecas nativas:** prefira usar `npx expo install` para bibliotecas suportadas; caso precise de uma versão específica, verifique a documentação da biblioteca.
- **Metro travando:** `npx expo start -c` limpa o cache e resolve a maioria dos problemas.

---

## Dicas úteis
- Se for usar recursos nativos avançados (Skia, Maps com chaves, Stripe nativo), leia a documentação oficial de cada biblioteca para ajustes de configuração nativa.
- Para builds de produção, use `eas build` (Expo Application Services) se o projeto estiver configurado.

---

## Estrutura básica de comandos (resumo)

```bash
npm install -g pnpm
npx expo upgrade        # opcional
npx expo install <as-dependencias-listadas-acima>
pnpm install
npx expo start -c
```

---

## Licença
Este projeto pode usar a licença que preferirem (ex.: MIT). Configure no arquivo `LICENSE`.

---

Se quiser, eu gero um `README.md` pronto para download com este conteúdo ou adapto para incluir instruções específicas (ex.: configuração do Supabase, Stripe, arquivos `.env`, ou scripts do `package.json`).

