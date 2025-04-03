# How to: Export Your Passwords From Chrome

<!--
date: 2019-08-18
-->

Passwords... the bane of our online existence. We all wish they'd go away, but there's no sign of that happening anytime soon. So what do most people do when their browser asks them if they'd like the browser to remember it for them? They say yes, of course.

Google Chrome used to save just the passwords that the user entered, including those that the user made up himself, which didn't do anything to hinder password reuse and bad passwords constructed by human beings. Fortunately, in later versions of Chrome, the browser itself suggests a strong password in many cases.

But saving your passwords in Chrome also means putting more eggs in Google's basket as those passwords are synced to your Google account. A prerequisite for access to those passwords, therefore, is access to the Google account. Lost your password? Had your account suspended? You are no longer able to access your passwords.

So what happens if you forget your password or lose access to that account in some other way? You may one day find yourself locked out of all your accounts if you forget just one password–the one for your Google account.

In order to get ahead of such a predicament, export your saved passwords from Chrome regularly and copy them to an external hard drive for safekeeping. Here's how:

  1. Launch Chrome, click the menu button (the three dots) in the upper right corner and select Settings.
  2. Click the Passwords link and you will see a list of the user names and passwords that you have saved—although the passwords will be hidden.
  3. Click the More actions button—the three dots to the right of the Saved passwords heading.
  4. From the menu that appears, select Export passwords and then click Export passwords.
  5. Enter your Windows user name and password when prompted and click OK.
  6. You will then be prompted to save your passwords in a comma-separated (.CSV) file.
  7. Zip that .CSV file with something like 7-Zip and encrypt it with a strong password. Be sure to use a Zip tool that employs strong encryption like 7-Zip, or alternatively, encrypt the zip file with GPG.
  8. Copy the zip file to an external hard drive and store that drive somewhere safe.
  9. Delete the original, unecrypted .CSV file using sdelete (Windows) or shred (Linux) to make sure it's overwritten thoroughly before it's deleted.

I don't think Chrome has the functionality to import that exported .CSV file (yet), but at least now you have a human-readable file with all your passwords in it if bad luck should befall you. You can open the decrypted file in any text editor.

(By the way, did you know... You can export almost everything but your passwords in your Google account through Google Takeout and even schedule regular backups as well? I wholeheartedly recommend you set this up if you haven't done so already.)

