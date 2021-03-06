// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

import UIContainerPlugin from '../../base/ui_container_plugin'
import Styler from '../../base/styler'
import watermarkStyle from './public/watermark.scss'
import watermarkHTML from './public/watermark.html'
import template from '../../base/template'
import Events from '../../base/events'

export default class WaterMarkPlugin extends UIContainerPlugin {
  get name() { return 'watermark' }

  get template() { return template(watermarkHTML) }

  constructor(options) {
    super(options)
    this.position = options.position || "bottom-right"
    if (options.watermark) {
      this.imageUrl = options.watermark
      this.render()
    } else {
      this.$el.remove()
    }
  }

  bindEvents() {
    this.listenTo(this.container, Events.CONTAINER_PLAY, this.onPlay)
    this.listenTo(this.container, Events.CONTAINER_STOP, this.onStop)
  }

  onPlay() {
    if (!this.hidden)
      this.$el.show()
  }

  onStop() {
    this.$el.hide()
  }

  render() {
    this.$el.hide()
    var templateOptions = {position: this.position, imageUrl: this.imageUrl}
    this.$el.html(this.template(templateOptions))
    var style = Styler.getStyleFor(watermarkStyle)
    this.container.$el.append(style)
    this.container.$el.append(this.$el)
    return this
  }
}

