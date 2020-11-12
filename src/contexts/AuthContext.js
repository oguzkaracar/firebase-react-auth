import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';

const AuthContext = createContext();

export function useAuth() {
  // useContext kullanırken kolaylık sağlaması açısından böyle bir fonk. oluşturuldu.. Custom Hook...
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  // firebase'e eklenecek user fonk.
  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password); // firebase'deki hazır bir metodu kullanarak email ve password değerlerini veriyoruz.
  }

  // firebase user authentication (user login)
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  // logout
  function logout() {
    return auth.signOut();
  }

  // reset password
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  //update password
  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  //update email
  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  useEffect(() => {
    // firebase tarafından oluşturulan user instance'ını state'deki currentUser değerine atıyoruz...
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user); // //  authenticate state'i değişirse ve kullanıcı bilgileri ile authenticate olursak currentUser state değerine authenticate olan user objesi eklenecek.. (auth. olan kullanıcı datasını tutacak.)
      setLoading(false); //  authenticate state'i değişirse olursa loading değeri false olucak...
    });

    return unsubscribe; // component unmount...
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updatePassword,
    updateEmail,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* loading state'i false ise (kullanıcı auth. oldu ise provider içindeki children render edilsin. ==> loading durumunu taklit ediyoruz... */}
      {!loading && children}
    </AuthContext.Provider>
  );
}
