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

import { BlockElement, BlockFactory, BlockDefinition } from "widget-sdk";
import { NfsRunnerWidgetProps, NfsRunnerWidget } from "./nfs-runner-widget";

const factory: BlockFactory = ({
  HTMLElement,
}: typeof window = window): Function => {
  /**
   *  <nfs-runner-widget message="world!"></nfs-runner-widget>
   */
  return class NfsRunnerWidgetBlock extends HTMLElement
    implements BlockElement {
    public constructor() {
      super();
    }

    private get props(): NfsRunnerWidgetProps {
      return {
        message: this.getAttribute("message") || "",
      };
    }

    public connectedCallback(): void {
      this.reactRender();
    }

    private reactRender(): void {
      ReactDOM.render(<NfsRunnerWidget {...this.props} />, this);
    }

    public static get observedAttributes(): string[] {
      return ["message"];
    }

    public attributeChangedCallback(): void {
      this.reactRender();
    }

    public adoptedCallback(): void {
      // noop
    }

    public disconnectedCallback(): void {
      ReactDOM.unmountComponentAtNode(this);
    }

    public unmount(): void {
      ReactDOM.unmountComponentAtNode(this);
    }
  };
};

const definition: BlockDefinition = {
  name: "nfs-runner-widget",
  factory: factory,
  attributes: ['message'],
  blockLevel: 'block'
};

window.defineBlock(definition);
