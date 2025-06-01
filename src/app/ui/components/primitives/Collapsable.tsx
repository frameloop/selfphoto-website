'use client'

import { useLayoutEffect, useRef, useState } from 'react'

import { Box, Row } from '@/app/ui/components/primitives'
import { Text } from '@/app/ui/components/molecules'


interface Props {
    isCollapsed: boolean
    list: string[]
}

export const Collapsable = ({ isCollapsed, list }: Props) => {
    const targetRef = useRef<HTMLInputElement>(null)
    const [dimensions, setDimensions] = useState<number>(0)
    useLayoutEffect(() => {
        if (targetRef.current) {
            setDimensions(targetRef.current.offsetHeight)
        }
    }, [targetRef.current, isCollapsed])

    return (
        <div
            className="transition-all  duration-700  overflow-hidden"
            style={{ maxHeight: isCollapsed ? '0px' : dimensions >= 1 ? `${dimensions}px` : 'none' }}
        >
            <div ref={targetRef}>
                <Box>
                    {list.map((text, index) => (
                        <Row key={index}>
                            <Text
                                paddingTop="mini"
                                paddingBottom="mini"
                                paddingLeft="mini"
                                paddingRight="small"
                                tag="span"
                                hierarchy="base"
                                textAlign="left"
                                color="primary"
                            >
                                {index + 1}.
                            </Text>
                            <Text
                                paddingTop="mini"
                                paddingBottom="mini"
                                paddingLeft="mini"
                                paddingRight="xLarge2"
                                tag="span"
                                hierarchy="base"
                                textAlign="left"
                                color="primary"
                            >
                                {' '}
                                {text}
                            </Text>
                        </Row>
                    ))}
                </Box>
            </div>
        </div>
    )
}
