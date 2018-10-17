import ImageRenderer from '@/components/datasets/renderers/ImageRenderer'
import PdfRenderer from '@/components/datasets/renderers/PdfRenderer'
import VideoRenderer from '@/components/datasets/renderers/VideoRenderer'
import CsvRenderer from '@/components/datasets/renderers/CsvRenderer'
import RichTextRenderer from '@/components/datasets/renderers/RichTextRenderer'

export default function mimeTypeRendererMapping () {
  return [
    {
      renderer: ImageRenderer,
      mimeTypes: [
        /^image\/.*/
      ]
    }, {
      renderer: PdfRenderer,
      mimeTypes: [
        'application/pdf'
      ]
    }, {
      renderer: VideoRenderer,
      mimeTypes: [
        /^video\/.*/
      ]
    }, {
      renderer: CsvRenderer,
      mimeTypes: [
        'text/csv',
        'text/tab-separated-values',
      ]
    }, {
      renderer: RichTextRenderer,
      mimeTypes: [
        'text/plain'
      ]
    }
  ]
}