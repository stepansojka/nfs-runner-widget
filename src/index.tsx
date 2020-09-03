/*!
 * Copyright 2020, Staffbase GmbH and contributors.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import ReactDOM from "react-dom";

import { BlockFactory, BlockDefinition } from "widget-sdk";
import { NfsRunnerWidget, NfsRunnerWidgetProps } from "./nfs-runner-widget";
import { author, version } from "../package.json";

const factory: BlockFactory = Base => {
  /**
   *  <nfs-runner-widget></nfs-runner-widget>
   */
  return class NfsRunnerWidgetBlock extends Base {
    private props: NfsRunnerWidgetProps = { name: "Dino" };

    constructor() {
      super();
    }

    get widgetLabel(): string {
      return "Dinosaur Game";
    }

    get iconUrl(): string {
      return "https://themommyavenger.files.wordpress.com/2015/12/jurassic-world-t-rex-vinylinfinity.jpg?w=150";
    }

    static get observedAttributes(): string[] {
      return ["widget-title", "on-card", "dinosaur-name"];
    }

    attributeChangedCallback(
      attributeName: string,
      oldValue: string | undefined,
      newValue: string | undefined
    ): void {
      console.log("attribute changed", attributeName, newValue);
      if (attributeName === "dinosaur-name" && newValue) {
        this.props = {
          ...this.props,
          name: newValue
        };
      } else {
        super.attributeChangedCallback(attributeName, oldValue, newValue);
      }
    }

    renderBlock(container: HTMLElement): void {
      ReactDOM.render(<NfsRunnerWidget {...this.props} />, container);
    }

    unmountBlock(container: HTMLElement): void {
      ReactDOM.unmountComponentAtNode(container);
    }
  };
};

const blockDefinition: BlockDefinition = {
  name: "stepan-runner-widget",
  factory: factory,
  attributes: ["widget-title", "on-card", "dinosaur-name"],
  blockLevel: "block",
  configurationSchema: {}
};

window.defineBlock({
  blockDefinition,
  author,
  version
});
