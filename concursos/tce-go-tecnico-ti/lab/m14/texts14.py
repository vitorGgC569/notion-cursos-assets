# -*- coding: utf-8 -*-
# Textos em ingles do Modulo 14. REAIS: transcritos das provas (conferidos em lab14/l2). AUTORAIS: escritos para o curso.
BYOD_TITLE='BYOD (texto do Wired, prova do TJ-CE 2022)'
BYOD=['BYOD (Bring Your Own Device) refers to the policy of allowing employees to supply their own computing devices for use at work. Employers save money by eliminating hardware purchasing and maintenance overhead, and employees enjoy the freedom of choice to use whichever mobile phone, tablet or laptop that best meets their preferences.',
'For example, a user may have a Windows PC for work and a MacBook for a personal laptop. The keyboard shortcuts for each platform are slightly different, making it easy to mangle copy-paste functions in word processors and spreadsheets. Using the same BYOD MacBook for work and personal computing eliminates these switchover errors.',
'Even for non-SaaS organizations, user error typically represents a third of all data loss, second only to hardware failure. The reduction in user error gained from BYOD policies is present regardless of whether an employee is creating a document in Google Apps or Microsoft Word.',
'There has yet been no rigorous study of the change in rates of user error before and after adopting BYOD policies. Nonetheless, it\'s safe to assume that some level of user error is reduced by familiarity and comfort with BYOD devices.',
'BYOD can\'t make your data invulnerable, but combined with good security policies, regular user training and effective data backup, it can make a noticeable difference in the availability and integrity of your company data.']
BYOD_CRED='(Disponível em: https://www.wired.com)'
UAC_TITLE='Security: UAC Gets Tolerable'
UAC=['Let\'s talk about User Account Control \u2212 the Windows Vista security element that was a prominent example for everything that bothered people about that OS. UAC aimed to prevent rogue software from tampering with your PC by endlessly prompting you to approve running applications or changing settings. The experience was so grating that many users preferred to turn UAC [PARTICLE] and [VERB] their chances with Internet attackers. Those who left it active risked slipping into the habit of incautiously clicking through every prompt, defeating whatever value the feature might have had.',
'Whereas Vista\'s notorious User Account Control gave users no control over the feature other than to turn it off, Windows 7\'s version of UAC lets users choose from two intermediate notification levels between \'Always notify\' and \'Never notify\'.',
'Windows 7 gives you control over UAC, in the form of a slider containing four security settings. As before, you can accept the full-blown UAC or elect to disable it. But you can also tell UAC to notify you only when software changes Windows settings, not when you\'re tweaking them yourself. And you can instruct it not to perform the abrupt screen-dimming effect that Vista\'s version uses to grab your attention.',
'If Microsoft had its druthers, all Windows 7 users [TO USE] UAC in full-tilt mode: The slider that you use to ratchet back its severity advises you not to do so if you routinely install new software or visit unfamiliar sites, and it warns that disabling the dimming effect is "Not recommended." [X], Redmond: I have every intention of recommending the intermediate settings to most people who ask me for advice, since those settings retain most of UAC\'s theoretical value without driving users bonkers.']
UAC_CRED='(Adapted from http://www.pcworld.com/article/172602/windows_7_review.html)'
# pedacos verificados no PDF (a lacuna [X] aparece deslocada na extracao do PDF)
UAC_PIECES=[UAC[0],UAC[1],UAC[2].split('. And you can')[0]+'.', 'And you can instruct it not to perform the abrupt screen-dimming effect that Vista\'s version uses to grab your attention.',
 'If Microsoft had its druthers, all Windows 7 users [TO USE] UAC in full-tilt mode: The slider that you use to ratchet back its severity advises you not to do so if you routinely install new software or visit unfamiliar sites, and it warns that disabling',
 'the dimming effect is "Not recommended."','Redmond: I','have every intention of recommending the intermediate settings to most people who ask me for advice, since those settings retain most of UAC\'s theoretical value without driving users bonkers.']
# ---- AUTORAIS
ART_A_TITLE='Passkeys (texto autoral)'
ART_A=['Passwords have been the weakest link in online security for decades. People reuse them across sites, choose words that are easy to guess and, in many cases, hand them over to fake login pages. Passkeys were designed to solve these problems. Instead of typing a secret, the user proves who they are with a fingerprint, a face scan or a device PIN, and the website receives only a public key, which is useless to an attacker.',
'Because there is nothing to memorize, there is also nothing to forget. Nevertheless, passkeys are not a perfect solution yet. Some older systems do not support them, and recovering an account after losing every device can be slow. Security experts therefore recommend keeping a second sign-in method until passkeys become universal.']
ART_B_TITLE='Backups (texto autoral)'
ART_B=['Many companies only discover that their backups are broken when they need them. A backup that has never been restored is just a hope, not a plan. A widely used guideline, known as the 3-2-1 rule, recommends keeping three copies of every important file, on two different types of storage, with one copy stored off site.',
'Although this approach costs more, it protects the business against hardware failure, human error and ransomware. Moreover, teams should test the restore procedure regularly, because a copy that cannot be restored is worthless. Finally, backups must be protected as carefully as the original data: if an attacker can delete them, the whole strategy fails.']
ART_C_TITLE='Release notes (texto autoral)'
ART_C=['Release notes, version 3.2.0.',
'New: the export endpoint now returns results in pages of 50 records. Use the next_page parameter to fetch the following page.',
'Changed: the default timeout was reduced from 60 to 30 seconds.',
'Deprecated: the /v1/reports endpoint will be removed in version 4.0, so clients should migrate to /v2/reports.',
'Fixed: a bug that caused duplicate entries when a request was retried.',
'Known issue: uploads larger than 2 GB may fail. The team is working on a fix.']
