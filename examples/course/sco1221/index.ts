/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import "./main.scss";
import "./markdown.scss";
import "./prism-github.scss";
import {ScoFactory, Sco, ISco} from "@haztivity/core";
import {HzNavbarComponent} from "@haztivity/hz-navbar";
import {page as page6611} from "./pages/6611/page";
import template from "./sco.pug";
let sco: ISco = ScoFactory.createSco(
    {
        name: "1221",
        template: template,
        pages: [
            page6611
        ],
        components: [
            HzNavbarComponent
        ]
    }
);

//error
sco.on();
sco.run();
