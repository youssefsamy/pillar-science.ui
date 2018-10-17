export default function mimeTypeIconMapping() {
  return {
    'file': [
      'application/octet-steam',
      /^binary\/.*/
    ],
    'file-alt': [
      'text/plain'
    ],
    'file-archive': [
      'application/x-cpio',
      'application/x-shar',
      'application/x-sbx',
      'application/x-tar',
      'application/x-bzip2',
      'application/gzip',
      'application/x-lzip',
      'application/x-lzma',
      'application/x-lzop',
      'application/x-snappy-framed',
      'application/x-xz',
      'application/x-compress',
      'application/x-7z-compressed',
      'application/x-ace-compressed',
      'application/x-astrotite-afa',
      'application/x-alz-compressed',
      'application/vnd.android.package-archive',
      'application/x-arj',
      'application/x-b1',
      'application/vnd.ms-cab-compressed',
      'application/x-cfs-compressed',
      'application/x-dar',
      'application/x-dgc-compressed',
      'application/x-apple-diskimage',
      'application/x-gca-compressed',
      'application/x-lzh',
      'application/x-lzx',
      'application/x-rar-compressed',
      'application/x-stuffit',
      'application/x-stuffitx',
      'application/x-gtar',
      'application/zip',
      'application/x-zoo',
      'application/x-par2'
    ],
    'file-audio': [
      /^audio\/.*/
    ],
    'file-code': [
      'text/html'
    ],
    'file-excel': [
      'text/csv',
      'text/tab-separated-values',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
      'application/vnd.ms-excel.sheet.macroEnabled.12',
      'application/vnd.ms-excel.template.macroEnabled.12',
      'application/vnd.ms-excel.addin.macroEnabled.12',
      'application/vnd.ms-excel.sheet.binary.macroEnabled.12'
    ],
    'file-image': [
      /^image\/.*/
    ],
    'file-pdf': [
      'application/pdf'
    ],
    'file-powerpoint': [
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/vnd.openxmlformats-officedocument.presentationml.template',
      'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
      'application/vnd.ms-powerpoint.addin.macroEnabled.12',
      'application/vnd.ms-powerpoint.presentation.macroEnabled.12',
      'application/vnd.ms-powerpoint.template.macroEnabled.12',
      'application/vnd.ms-powerpoint.slideshow.macroEnabled.12'
    ],
    'file-video': [
      /^video\/.*/
    ],
    'file-word': [
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
      'application/vnd.ms-word.document.macroEnabled.12',
      'application/vnd.ms-word.template.macroEnabled.12',
      'application/msword'
    ]
  }
}