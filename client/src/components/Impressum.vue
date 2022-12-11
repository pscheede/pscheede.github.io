<i18n>
de:
  impressum: Impressum
  copyright: Urheberrecht
  copyright_text: Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bittet der Seitenbetreiber um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden derartige Inhalte umgehend entfernt.
  privacy_policy: Datenschutz
  privacy_policy_text: Die Nutzung dieser Webseite ist ohne Angabe personenbezogener Daten möglich. Es werden keinerlei Cookies verwendet.
  privacy_policy_part2: Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit ausdrücklich widersprochen. Der Betreiber dieser Seite behält sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-Mails, vor.
  open_source: Open Source Lizenzen
  open_source_text:
    Diese Webseite verwendet Open Source Software, deren Lizenzen zusammen mit dieser Website ausgeliefert werden müssen.
    Die Lizenzen sind im folgenden Abschnitt aufgeführt. Dieser Abschnitt wurde automatisch generiert und liegt daher nur in englischer Sprache vor.
  click_to_open: Klicken um zu öffnen
en:
  impressum: Legal Notice
  copyright: Copyright
  copyright_text: The contents and works created by the site operator on these pages are subject to German copyright law. Duplication, processing, distribution, or any form of commercialization of such material beyond the scope of the copyright law shall require the prior written consent of its respective author or creator. Downloads and copies of this site are only permitted for private, non-commercial use. Insofar as the content on this site was not created by the operator, the copyrights of third parties are respected. In particular, third-party content is identified as such. Should you nevertheless become aware of a copyright infringement, the site operator requests that you notify the operator accordingly. Upon becoming aware of any infringements, such content will be removed immediately.
  privacy_policy: Privacy policy
  privacy_policy_text: The use of this website is possible without providing personal data. No cookies of any kind are used.
  privacy_policy_part2: The use of contact data published within the framework of the legal notice obligation by third parties for the purpose of sending unsolicited advertising and information material is hereby expressly prohibited. The operators of the pages expressly reserve the right to take legal action in the event of the unsolicited sending of advertising information, such as spam e-mails.
  open_source: Open Source Licenses
  open_source_text:
    This website uses open source software, the licenses of which must be delivered with this website.
    The licenses are listed in the following auto-generated section.
  click_to_open: Click to open
</i18n>

<template>
  <div class="impressum-host">
    <div class='impressum'>
      <h1>{{ t('impressum') }}</h1>
      <p>
        Philipp Scheede<br>
        Dietrich-Bonhoeffer-Str. 8<br>
        87448 Waltenhofen<br>
        <a href='mailto:info@p-scheede.de'>info@p-scheede.de</a><br>
        01575 5219921
      </p>
      <p class="main-content">
        <strong>{{ t('copyright') }}</strong><br><br>
        {{ t('copyright_text') }}
        <br><br>
        <strong>{{ t('privacy_policy') }}</strong><br><br>
        {{ t('privacy_policy_text') }}
        <br><br>
        {{ t('privacy_policy_part2') }}
        <br><br>
        <strong>{{ t('open_source') }}</strong><br><br>
        {{ t('open_source_text') }}
      </p>

      <div class="licenses">
        <details>
          <summary>{{ t('click_to_open') }}</summary>
          <div class="content">
            {{ licensesText }}
          </div>
        </details>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import licensesText from '@/licenses.txt?raw';

console.log(licensesText);

const {t} = useI18n();
</script>

<style lang="scss" scoped>
.impressum-host {
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
}

.impressum {
  color: var(--text-medium);
  max-width: 800px;

  margin: 4rem 2rem 2rem;

  line-height: 1.5;

  h1 {
    font-size: 2rem;
    font-weight: 500;
    margin-bottom: 1rem;
  }

  .main-content {
    margin-top: 2rem;
  }

  .licenses {
    white-space: pre-wrap;

    padding: 1rem;
    margin-top: 2rem;

    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 0.5rem;

    .content {
      margin-top: 1rem;
    }

    summary {
      cursor: pointer;
    }
  }

  a {
    color: inherit;
    text-decoration: none;

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        color: var(--primary-dark);
      }
    }
  }
}
</style>