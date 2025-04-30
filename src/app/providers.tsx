import { PropsWithChildren } from 'react'
import { Provider as ChakraProvider } from '@components/ui/provider.tsx'
import i18n from '@lib/i18n.ts'
import { I18nextProvider } from 'react-i18next'
import { Toaster } from '@components/ui/toaster.tsx'
import { Provider } from 'react-redux'
import { persistor, store } from '@store/index.ts'
import { PersistGate } from 'redux-persist/integration/react'
import '../../node_modules/flag-icons/css/flag-icons.min.css'

export function Providers({ children }: PropsWithChildren) {
  return (
    <ChakraProvider>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            {children}
            <Toaster />
          </PersistGate>
        </Provider>
      </I18nextProvider>
    </ChakraProvider>
  )
}
