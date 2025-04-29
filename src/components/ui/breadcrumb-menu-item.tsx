import { Breadcrumb, Menu, Portal } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

interface BreadcrumbMenuItemProps extends PropsWithChildren {
  items: Array<{ label: string; value: string }>
}

export function BreadcrumbMenuItem({ children, items }: BreadcrumbMenuItemProps) {
  return (
    <Breadcrumb.Item>
      <Menu.Root>
        <Menu.Trigger asChild>{children}</Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              {items.map((item) => (
                <Menu.Item key={item.value} value={item.value}>
                  {item.label}
                </Menu.Item>
              ))}
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </Breadcrumb.Item>
  )
}
