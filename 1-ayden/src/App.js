import "./App.css";
import AdyenCheckout from "@adyen/adyen-web";
import "@adyen/adyen-web/dist/adyen.css";
import { useEffect, useState, useMemo, useCallback } from "react";

function App() {
  const [checkout, setCheckout] = useState(null);

  const [encryptedStr, setEncryptedStr] = useState("");

  const handleOnChange = useCallback((state, component) => {
    // state.isValid; // True or false. Specifies if all the information that the shopper provided is valid.
    // state.data; // Provides the data that you need to pass in the `/payments` call.
    // component; // Provides the active component instance that called this event.

    const { paymentMethod } = state.data;
    const {
      encryptedCardNumber,
      encryptedExpiryMonth,
      encryptedExpiryYear,
      encryptedSecurityCode,
    } = paymentMethod;
    if (
      encryptedCardNumber &&
      encryptedExpiryMonth &&
      encryptedExpiryYear &&
      encryptedSecurityCode
    ) {
      setEncryptedStr(
        JSON.stringify({
          encryptedCardNumber,
          encryptedExpiryMonth,
          encryptedExpiryYear,
          encryptedSecurityCode,
        })
      );
    } else {
      setEncryptedStr("");
    }
  }, []);

  const configuration = useMemo(() => {
    return {
      locale: "en_US",
      environment: "test",
      clientKey: "test_UYZEIG5QNBHLPHZWRLBQCHEQFMRJGULV",
      onChange: handleOnChange,
    };
  }, [handleOnChange]);

  useEffect(() => {
    const fn = async () => {
      const newCheckout = await AdyenCheckout(configuration);
      newCheckout.create("card").mount("#card-container");
      setCheckout(newCheckout);
    };

    fn();
  }, [configuration]);

  return (
    <div className="app">
      <div id="card-container"></div>

      <div
        style={{
          padding: "20px",
          wordBreak: "break-all",
        }}
      >
        {encryptedStr}
      </div>
    </div>
  );
}

export default App;
