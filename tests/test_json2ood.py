import tempfile
import unittest
from pathlib import Path

import json2ood


class Json2OodTests(unittest.TestCase):
    def write_base_form(self) -> Path:
        temp_dir = Path(tempfile.mkdtemp(prefix="json2ood-test-"))
        base_form = temp_dir / "form.template.erb"
        base_form.write_text("---\nattributes:\n", encoding="utf-8")
        self.addCleanup(lambda: __import__("shutil").rmtree(temp_dir, ignore_errors=True))
        return base_form

    def test_normalize_schema_uses_titles_and_skips_hidden_fields(self) -> None:
        schema = {
            "$defs": {
                "input_options": {
                    "title": "Input options",
                    "description": "Top level help.\nExtra details.",
                    "required": ["input", "skip_qc"],
                    "properties": {
                        "input": {
                            "title": "Input sample sheet",
                            "type": "string",
                            "format": "file-path",
                            "description": "Path to the samplesheet.\nSecond line.",
                        },
                        "skip_qc": {
                            "type": "boolean",
                            "default": False,
                            "description": "Skip QC.",
                        },
                        "report_file": {
                            "type": "string",
                            "description": "Should be hidden.",
                        },
                    },
                }
            }
        }

        groups = json2ood.normalize_schema(schema)

        self.assertEqual(len(groups), 1)
        group = groups[0]
        self.assertEqual(group.label, "Input options")
        self.assertEqual(group.help_text, "Top level help.")
        self.assertEqual([field.original_name for field in group.fields], ["input", "skip_qc"])
        self.assertEqual(group.fields[0].label, "Input sample sheet")
        self.assertTrue(group.fields[1].required)

    def test_render_form_handles_escaping_and_field_order(self) -> None:
        schema = {
            "definitions": {
                "input_options": {
                    "properties": {
                        "sample_name": {
                            "title": "Sample's name",
                            "type": "string",
                            "default": "Kid's \"sample\"",
                            "description": "User-facing label with quotes: ok",
                        },
                        "aligner": {
                            "type": "string",
                            "enum": ["star", "hisat2"],
                            "default": "star",
                        },
                        "max_reads": {
                            "type": "integer",
                            "default": 25,
                        },
                    }
                }
            }
        }

        form, params = json2ood.generate_outputs(schema, self.write_base_form())

        self.assertIn("label: 'Sample''s name'", form)
        self.assertIn("value: 'Kid''s \"sample\"'", form)
        self.assertIn("options:\n      - ['star', 'star']", form)
        self.assertIn("  - input_options\n  - sample_name\n  - aligner\n  - max_reads", form)
        self.assertIn('"sample_name": context.sample_name', params)
        self.assertIn('"max_reads": to_number.call(context.max_reads)', params)

    def test_normalize_key_is_explicit_and_identifier_safe(self) -> None:
        self.assertEqual(json2ood.normalize_key("ignore_3prime_r2"), "ignore_prime3_r2")
        self.assertEqual(json2ood.normalize_key("h3k27"), "hk327")
        self.assertEqual(json2ood.normalize_key("host_fasta_bowtie2index"), "host_fasta_bowtieindex2")
        self.assertEqual(json2ood.normalize_key("3prime"), "prime3")
        self.assertEqual(json2ood.normalize_key("123"), "n123")
        self.assertEqual(json2ood.normalize_key("sample-name"), "sample_name")


if __name__ == "__main__":
    unittest.main()
