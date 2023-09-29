import * as LocalAuthentication from 'expo-local-authentication';

export async function authenticateBiometric() {
  const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();

  if (!isBiometricAvailable) {
    console.log("L'authentification biométrique n'est pas disponible sur cet appareil.");
    return;
  }

  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: 'Veuillez vous authentifier pour accéder à votre profil.',
  });

  if (result.success) {
    console.log('Authentification biométrique réussie.');
  } else {
    console.log("L'authentification biométrique a échoué ou a été annulée.");
  }
}
