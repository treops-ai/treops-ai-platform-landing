import { landingMessages, type Locale } from "@treops/core/i18n";

// The landing site only needs the `landing` namespace (login/dashboard copy lives
// in the app). Keeping this narrow avoids shipping unrelated translations.
export async function getMessages(locale: Locale) {
  return {
    landing: landingMessages[locale],
  };
}
