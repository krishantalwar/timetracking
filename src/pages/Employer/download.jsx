import { PDFDownloadLink } from '@react-pdf/renderer'
import * as React from 'react';
import TestTimetracTingActivitiess from './TimetracTingActivitiess'

export default function Download() {
    const [show, setShow] = React.useState(false)

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            setShow(true)
        }, 5000)
        return () => clearTimeout(timeout)
    }, [])
    return (
        <div
            className={'download-pdf '}
            title="Save PDF">
            {
                show &&
                (
                    <PDFDownloadLink
                        document={<TestTimetracTingActivitiess />}
                        fileName={'invoice.pdf'}
                        aria-label="Save PDF"
                    >
                        {
                            ({ blob, url, loading, error }) => {
                                console.log("blob", blob)
                                console.log("url", url)
                                console.log("loading", loading)
                                console.log("error", error)
                                return (loading ? 'Loading document...' : 'Download PDF')
                            }

                        }
                    </PDFDownloadLink>
                )}
        </div>
    )
}

