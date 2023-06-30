"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEventDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class updateEventDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Veuillez remplir tous les champs." }),
    __metadata("design:type", String)
], updateEventDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Veuillez remplir tous les champs." }),
    __metadata("design:type", String)
], updateEventDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Veuillez remplir tous les champs." }),
    (0, class_transformer_1.Transform)(({ value }) => value && new Date(value)),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], updateEventDto.prototype, "date", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Veuillez remplir tous les champs." }),
    (0, class_validator_1.Matches)(/^([01]\d|2[0-3]):([0-5]\d)$/),
    __metadata("design:type", String)
], updateEventDto.prototype, "time", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Veuillez remplir tous les champs." }),
    __metadata("design:type", Number)
], updateEventDto.prototype, "players", void 0);
__decorate([
    (0, class_validator_1.IsNumberString)({}, { message: "Identifiant invalide" }),
    __metadata("design:type", String)
], updateEventDto.prototype, "id", void 0);
exports.updateEventDto = updateEventDto;
//# sourceMappingURL=update-event.dto.js.map