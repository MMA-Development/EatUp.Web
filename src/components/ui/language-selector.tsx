import {
  createListCollection,
  Flex,
  HStack,
  Portal,
  Select,
  SelectRootProps
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

export function LanguageSelector({ ...props }: Omit<SelectRootProps, 'collection'>) {
  const { i18n } = useTranslation()

  const languages = createListCollection({
    items: [
      // ISO 3166-1 country code
      { label: 'Dansk', value: 'da', countryCode: 'dk' },
      { label: 'English', value: 'en', countryCode: 'us' }
    ]
  })

  const currentLang =
    languages.items.find((lang) => lang.value === i18n.language) || languages.items[0]

  const handleLanguageChange = async (lang: string) => {
    await i18n.changeLanguage(lang)
  }

  return (
    <Select.Root
      {...props}
      collection={languages}
      positioning={{ sameWidth: true }}
      onValueChange={(val) => handleLanguageChange(val.value[0])}
      defaultValue={[i18n.language]}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger rounded={'lg'}>
          <Select.ValueText>
            <HStack>
              <Flex
                w="30px"
                h="30px"
                p={'0.125rem'}
                borderRadius="full"
                border="1px solid"
                borderColor="border"
              >
                <span
                  className={`fib fi-${currentLang.countryCode} fis`}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 'inherit'
                  }}
                />
              </Flex>
              {currentLang.label}
            </HStack>
          </Select.ValueText>
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content rounded={'lg'}>
            {languages.items.map((lang) => (
              <Select.Item rounded={'lg'} item={lang} key={lang.value} justifyContent="flex-start">
                <Flex
                  w="30px"
                  h="30px"
                  p={'0.125rem'}
                  borderRadius="full"
                  border="1px solid"
                  borderColor="border"
                >
                  <span
                    className={`fib fi-${lang.countryCode} fis`}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 'inherit'
                    }}
                  />
                </Flex>
                {lang.label}
                <Select.ItemIndicator ml={'auto'} />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}
